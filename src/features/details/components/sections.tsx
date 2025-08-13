'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Play, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSectionsByCourseId } from '@/lib/actions';
import CreateSectionForm from './create-section-form';
import CreateLessonForm from './create-lesson-form';
import { toast } from 'sonner';

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  youtubeVideoId: string;
  duration: number | null;
  order: number;
}

interface Section {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

interface SectionsProps {
  courseId: string;
}

export default function Sections({ courseId }: SectionsProps) {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSections = async () => {
    try {
      const result = await getSectionsByCourseId(courseId);
      if (result.success && result.sections) {
        setSections(result.sections);
      } else {
        console.error('Failed to fetch sections:', result.message);
      }
    } catch (error) {
      console.error('Error fetching sections:', error);
      toast.error('Có lỗi xảy ra khi tải danh sách phần học');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, [courseId]);

  const formatDuration = (seconds: number | null): string => {
    if (!seconds) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Nội dung khóa học</h3>
          <CreateSectionForm courseId={courseId} onSuccess={fetchSections} />
        </div>
        <div className="text-center py-8 text-muted-foreground">
          Đang tải nội dung...
        </div>
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Nội dung khóa học</h3>
          <CreateSectionForm courseId={courseId} onSuccess={fetchSections} />
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <p>Chưa có phần học nào.</p>
          <p className="text-sm">Hãy tạo phần học đầu tiên để bắt đầu!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Nội dung khóa học</h3>
        <CreateSectionForm courseId={courseId} onSuccess={fetchSections} />
      </div>
      
      <Accordion type="multiple" className="space-y-2">
        {sections.map((section) => (
          <AccordionItem 
            key={section.id} 
            value={section.id} 
            className="border rounded-lg"
          >
            <AccordionTrigger className="font-semibold bg-muted/50 px-4 py-3 rounded-lg hover:bg-muted/70 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Phần {section.order}
                </span>
                <span>{section.title}</span>
                {section.lessons.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    ({section.lessons.length} bài học)
                  </span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              {section.lessons.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  <p className="text-sm">Chưa có bài học nào trong phần này.</p>
                  <CreateLessonForm 
                    sectionId={section.id} 
                    onSuccess={fetchSections}
                  />
                </div>
              ) : (
                <div className="space-y-1 mt-2">
                  <div className="flex justify-end mb-2">
                    <CreateLessonForm 
                      sectionId={section.id} 
                      onSuccess={fetchSections}
                    />
                  </div>
                  {section.lessons.map((lesson) => (
                    <Button
                      key={lesson.id}
                      variant="ghost"
                      className="w-full justify-between items-center p-3 h-auto hover:bg-muted/50"
                      onClick={() => {
                        // TODO: Implement lesson playback
                        toast.info(`Phát bài học: ${lesson.title}`);
                      }}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Play className="text-primary h-4 w-4 flex-shrink-0" />
                        <div className="flex-1 text-left">
                          <span className="text-sm font-medium">
                            {lesson.order}. {lesson.title}
                          </span>
                          {lesson.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {lesson.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">
                          {formatDuration(lesson.duration)}
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}