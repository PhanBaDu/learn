'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ClockFading, Play } from 'lucide-react';
import Image from 'next/image';
import { Course as CourseType } from '@prisma/client';
import Link from 'next/link';

// Extend Course type to include stats
interface CourseWithStats extends CourseType {
  totalVideos?: number;
  totalDuration?: number;
  formattedDuration?: string;
}

export default function Course({ course }: { course: CourseWithStats }) {
  return (
    <div className="rounded-2xl overflow-hidden h-80">
      <Link href={`/courses/${course.id}`}>
        <Image
          src={course.thumbnail}
          alt="route"
          width={1000}
          height={1000}
          className="w-full h-56 object-cover"
          quality={100}
        />
        <div className="p-5 bg-muted/70 flex flex-col gap-2 rounded-b-2xl h-full overflow-hidden">
          <h1 className="text-sm font-bold">{course.title}</h1>
          
          {/* Người dạy + Số video + Thời gian trên 1 dòng */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Avatar className="rounded-lg w-7 h-7">
                <AvatarImage src={course.teacherImage} />
                <AvatarFallback>{course.instructorName}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground font-bold text-nowrap">
                {course.instructorName}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <Button disabled={true} variant="ghost" className="p-0 flex items-center gap-1">
                <Play strokeWidth={3} />
                <span className="text-xs text-muted-foreground font-bold leading-none">
                  {course.totalVideos || 0} video
                </span>
              </Button>
              
              <Button disabled={true} variant="ghost" className="p-0 flex items-center gap-1">
                <span className="text-xs text-muted-foreground font-bold leading-none">
                  {course.formattedDuration || '0p'}
                </span>
                <ClockFading strokeWidth={3} />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
