'use server';
import { revalidatePath } from 'next/cache';
import { createCourseSchema, createSectionSchema, createLessonSchema } from '@/lib/schemas';
import prisma from '@/utils/db';
import { getCurrentUser } from '@/hooks/current-user';
import z from 'zod';

export async function createCourseWithReturn(formData: FormData) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: 'Bạn cần đăng nhập để thực hiện hành động này' };
    }

    const { id: userId, role } = user;

    if (!userId || role !== 'ADMIN') {
      return { success: false, message: 'Bạn không có quyền thực hiện hành động này' };
    }

    const rawData = Object.fromEntries(formData.entries());

    const transformedData = {
      title: rawData.title,
      description: rawData.description,
      instructorName: rawData.teacherName,
      thumbnail: rawData.thumbnail,
      teacherImage: rawData.teacherImage,
    };

    const validatedData = createCourseSchema.parse(transformedData);

    const course = await prisma.course.create({
      data: {
        ...validatedData,
        userId: userId,
      },
    });

    revalidatePath('/courses');
    return { success: true, course };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại các trường.';
      const fieldErrors = error.flatten().fieldErrors;
      return {
        success: false,
        errors: fieldErrors,
        message: errorMessage,
      };
    }

    const errorMessage = 'Có lỗi xảy ra khi tạo khóa học';
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function createSection(formData: FormData) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: 'Bạn cần đăng nhập để thực hiện hành động này' };
    }

    const { id: userId, role } = user;

    if (!userId || role !== 'ADMIN') {
      return { success: false, message: 'Bạn không có quyền thực hiện hành động này' };
    }

    const rawData = Object.fromEntries(formData.entries());

    const transformedData = {
      title: rawData.title,
      order: parseInt(rawData.order as string),
      courseId: rawData.courseId,
    };

    const validatedData = createSectionSchema.parse(transformedData);

    // Verify that the course exists and belongs to the user
    const course = await prisma.course.findFirst({
      where: {
        id: validatedData.courseId,
        userId: userId,
      },
    });

    if (!course) {
      return { success: false, message: 'Khóa học không tồn tại hoặc bạn không có quyền truy cập' };
    }

    const section = await prisma.section.create({
      data: validatedData,
    });

    revalidatePath(`/courses/${validatedData.courseId}`);
    return { success: true, section };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại các trường.';
      const fieldErrors = error.flatten().fieldErrors;
      return {
        success: false,
        errors: fieldErrors,
        message: errorMessage,
      };
    }

    const errorMessage = 'Có lỗi xảy ra khi tạo phần học';
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function createLesson(formData: FormData) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: 'Bạn cần đăng nhập để thực hiện hành động này' };
    }

    const { id: userId, role } = user;

    if (!userId || role !== 'ADMIN') {
      return { success: false, message: 'Bạn không có quyền thực hiện hành động này' };
    }

    const rawData = Object.fromEntries(formData.entries());

    const transformedData = {
      title: rawData.title,
      description: rawData.description || undefined,
      youtubeVideoId: rawData.youtubeVideoId,
      duration: rawData.duration ? parseInt(rawData.duration as string) : undefined,
      order: parseInt(rawData.order as string),
      sectionId: rawData.sectionId,
    };

    const validatedData = createLessonSchema.parse(transformedData);

    // Verify that the section exists and belongs to a course owned by the user
    const section = await prisma.section.findFirst({
      where: {
        id: validatedData.sectionId,
        course: {
          userId: userId,
        },
      },
      include: {
        course: true,
      },
    });

    if (!section) {
      return { success: false, message: 'Phần học không tồn tại hoặc bạn không có quyền truy cập' };
    }

    const lesson = await prisma.lesson.create({
      data: validatedData,
    });

    revalidatePath(`/courses/${section.course.id}`);
    return { success: true, lesson };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại các trường.';
      const fieldErrors = error.flatten().fieldErrors;
      return {
        success: false,
        errors: fieldErrors,
        message: errorMessage,
      };
    }

    const errorMessage = 'Có lỗi xảy ra khi tạo bài học';
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function getSectionsByCourseId(courseId: string) {
  try {
    const sections = await prisma.section.findMany({
      where: {
        courseId: courseId,
      },
      include: {
        lessons: {
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    });

    return { success: true, sections };
  } catch (error) {
    console.error('Error fetching sections:', error);
    return {
      success: false,
      message: 'Có lỗi xảy ra khi lấy danh sách phần học',
    };
  }
}

export async function getCourseById(courseId: string) {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        sections: {
          include: {
            lessons: {
              orderBy: {
                order: 'asc',
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    return { success: true, course };
  } catch (error) {
    console.error('Error fetching course:', error);
    return {
      success: false,
      message: 'Có lỗi xảy ra khi lấy thông tin khóa học',
    };
  }
}
