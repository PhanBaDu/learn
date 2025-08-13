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
