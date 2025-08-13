import { getCurrentUser } from '@/hooks/current-user';
import React from 'react';
import CreateCourseForm from '@/features/courses/components/create-course-form';
import ListCourse from '@/features/courses/components/list-course';

export default async function Courses() {
  const user = await getCurrentUser();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
      <ListCourse />
      {user?.role === 'ADMIN' && <CreateCourseForm />}
    </div>
  );
}
