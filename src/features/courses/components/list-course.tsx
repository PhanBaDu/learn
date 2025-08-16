import Course from '@/features/courses/components/course';
import { getAllCoursesWithStats } from '@/lib/actions';

export default async function ListCourse() {
  const result = await getAllCoursesWithStats();

  if (!result.success || !result.courses) {
    return <div>No courses found</div>;
  }

  return (
    <>
      {result.courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </>
  );
}
