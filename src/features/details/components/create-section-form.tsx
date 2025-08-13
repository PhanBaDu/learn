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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { createSection } from '@/lib/actions';
import { toast } from 'sonner';
import { useState } from 'react';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Tiêu đề phần học là bắt buộc',
  }),
  order: z.string().min(1, {
    message: 'Thứ tự phần học là bắt buộc',
  }),
});

interface CreateSectionFormProps {
  courseId: string;
  onSuccess?: () => void;
}

export default function CreateSectionForm({ courseId, onSuccess }: CreateSectionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      order: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('order', values.order);
      formData.append('courseId', courseId);

      const result = await createSection(formData);

      if (result.success) {
        toast.success('Phần học đã được tạo thành công!');
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
        <Button className="font-bold" size={'sm'} variant={'outline'}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm phần học
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Tạo phần học mới</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề phần học</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tiêu đề phần học..." {...field} />
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
                  <FormLabel>Thứ tự phần học</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Nhập thứ tự..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Đang tạo...' : 'Tạo phần học'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
