import { getCourseById } from '@/lib/actions';
import { notFound } from 'next/navigation';
import Sections from "@/features/details/components/sections";
import Image from 'next/image';

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
    <div className="w-full flex flex-col lg:flex-row gap-5">
      <div className="w-full lg:w-4/6 flex flex-col gap-5">
        <Sections courseId={courseId} />
      </div>
      {/* Ẩn phần mô tả trên mobile, chỉ hiển thị trên desktop */}
      <div className="hidden lg:block w-full lg:w-2/6">
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground mt-2">{course.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Image
                src={course.teacherImage}
                alt={course.instructorName}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm text-muted-foreground">{course.instructorName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

