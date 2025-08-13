import { getCourseById } from '@/lib/actions';
import { notFound } from 'next/navigation';
import Sections from "@/features/details/components/sections";

interface CourseDetailPageProps {
  params: {
    id: string;
  };
}

export default async function CourseDetail({ params }: CourseDetailPageProps) {
  const { id: courseId } = params;
  
  const result = await getCourseById(courseId);
  
  if (!result.success || !result.course) {
    notFound();
  }

  const course = result.course;

  return (
    <div className="w-full flex gap-5">
      <div className="w-4/6 flex flex-col gap-5">
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground mt-2">{course.description}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img 
                src={course.teacherImage} 
                alt={course.instructorName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm text-muted-foreground">
                {course.instructorName}
              </span>
            </div>
          </div>
        </div>

        <Sections courseId={courseId} />
      </div>
      
      <div className="w-2/6">
        <div className="sticky top-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Thông tin khóa học</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Số phần học:</span>
                <span>{course.sections.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tổng bài học:</span>
                <span>
                  {course.sections.reduce((total, section) => total + section.lessons.length, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ngày tạo:</span>
                <span>{new Date(course.createdAt).toLocaleDateString('vi-VN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

