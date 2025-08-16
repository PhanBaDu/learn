'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, ExternalLink } from 'lucide-react';
import { createLesson } from '@/lib/actions';
import { toast } from 'sonner';
import { useState } from 'react';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Tiêu đề bài học là bắt buộc',
  }),
  description: z.string().optional(),
  youtubeVideoId: z.string().min(1, {
    message: 'ID video YouTube là bắt buộc',
  }),
  duration: z.string().optional(),
  order: z.string().min(1, {
    message: 'Thứ tự bài học là bắt buộc',
  }),
});

// Helper function to extract YouTube video ID from various URL formats
const extractYouTubeId = (url: string): string => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^[a-zA-Z0-9_-]{11}$/, // Direct video ID format
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1] || match[0];
    }
  }
  
  return url; // Return as-is if no pattern matches
};

interface CreateLessonFormProps {
  sectionId: string;
  onSuccess?: () => void;
}

export default function CreateLessonForm({ sectionId, onSuccess }: CreateLessonFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      youtubeVideoId: '',
      duration: '',
      order: '',
    },
  });

  const handleYouTubeUrlChange = (value: string) => {
    const videoId = extractYouTubeId(value);
    form.setValue('youtubeVideoId', videoId);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description || '');
      formData.append('youtubeVideoId', values.youtubeVideoId);
      formData.append('duration', values.duration || '');
      formData.append('order', values.order);
      formData.append('sectionId', sectionId);

      const result = await createLesson(formData);

      if (result.success) {
        toast.success('Bài học đã được tạo thành công!');
        form.reset();
        setIsOpen(false);
        onSuccess?.();
      } else {
        if (result.message) {
          toast.error(result.message);
        }

        if (result.errors && Object.keys(result.errors).length > 0) {
          Object.entries(result.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              form.setError(field as keyof z.infer<typeof formSchema>, {
                type: 'server',
                message: messages[0],
              });
            }
          });
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Có lỗi xảy ra khi gửi form');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Thêm bài học
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Tạo bài học mới</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề bài học</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tiêu đề bài học..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả (tùy chọn)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Nhập mô tả bài học..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="youtubeVideoId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link hoặc ID Video YouTube</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="Nhập link hoặc ID video YouTube..." 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleYouTubeUrlChange(e.target.value);
                        }}
                      />
                      {field.value && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-6 w-6 p-0"
                          onClick={() => {
                            const videoId = extractYouTubeId(field.value);
                            if (videoId) {
                              window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
                            }
                          }}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    Hỗ trợ: youtube.com/watch?v=..., youtu.be/..., hoặc ID trực tiếp
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thời lượng (giây)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Thời lượng..." 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thứ tự</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Thứ tự..." 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Đang tạo...' : 'Tạo bài học'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
