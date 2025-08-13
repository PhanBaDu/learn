import { z } from 'zod';

export const createCourseSchema = z.object({
  title: z.string().min(1, {
    message: 'Tiêu đề khóa học là bắt buộc',
  }),
  description: z.string().min(1, {
    message: 'Mô tả khóa học là bắt buộc',
  }),
  instructorName: z.string().min(1, {
    message: 'Tên thầy giáo là bắt buộc',
  }),
  thumbnail: z.string().min(1, {
    message: 'Ảnh khóa học là bắt buộc',
  }),
  teacherImage: z.string().min(1, {
    message: 'Ảnh thầy giáo là bắt buộc',
  }),
});

export const createSectionSchema = z.object({
  title: z.string().min(1, {
    message: 'Tiêu đề phần học là bắt buộc',
  }),
  order: z.number().min(1, {
    message: 'Thứ tự phần học phải lớn hơn 0',
  }),
  courseId: z.string().min(1, {
    message: 'ID khóa học là bắt buộc',
  }),
});

export const createLessonSchema = z.object({
  title: z.string().min(1, {
    message: 'Tiêu đề bài học là bắt buộc',
  }),
  description: z.string().optional(),
  youtubeVideoId: z.string().min(1, {
    message: 'ID video YouTube là bắt buộc',
  }),
  duration: z.number().optional(),
  order: z.number().min(1, {
    message: 'Thứ tự bài học phải lớn hơn 0',
  }),
  sectionId: z.string().min(1, {
    message: 'ID phần học là bắt buộc',
  }),
});
