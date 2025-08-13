import Course from '@/features/courses/components/course';
import prisma from '@/utils/db';

export default async function ListCourse() {
  const courses = await prisma.course.findMany();

  if (!courses) return <div>No courses found</div>;
  return (
    <>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </>
  );
}
