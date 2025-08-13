'use server';
import { revalidatePath } from 'next/cache';
import { createCourseSchema } from '@/lib/schemas';
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
