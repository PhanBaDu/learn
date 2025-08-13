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
import { FileVideoCamera, Upload, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useRef, useState } from 'react';
import Image from 'next/image';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Trường tiêu đề khóa học là bắt buộc',
  }),
  description: z.string().min(1, {
    message: 'Trường mô tả khóa học là bắt buộc',
  }),
  teacherName: z.string().min(1, {
    message: 'Trường tên thầy giáo là bắt buộc',
  }),
  courseImage: z.string().min(1, {
    message: 'Trường ảnh khóa học là bắt buộc',
  }),
  teacherImage: z.string().min(1, {
    message: 'Trường ảnh thầy giáo là bắt buộc',
  }),
});

// Helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export default function CreateCourseForm() {
  const teacherImageInputRef = useRef<HTMLInputElement>(null);
  const courseImageInputRef = useRef<HTMLInputElement>(null);
  const [teacherImagePreview, setTeacherImagePreview] = useState<string>('');
  const [courseImagePreview, setCourseImagePreview] = useState<string>('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      teacherName: '',
      courseImage: '',
      teacherImage: '',
    },
  });

  const handleImageUpload = async (file: File, fieldName: 'teacherImage' | 'courseImage') => {
    try {
      const base64 = await fileToBase64(file);
      form.setValue(fieldName, base64);

      if (fieldName === 'teacherImage') {
        setTeacherImagePreview(base64);
      } else {
        setCourseImagePreview(base64);
      }
    } catch (error) {
      console.error('Error converting file to base64:', error);
    }
  };

  const handleTeacherImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file, 'teacherImage');
    }
  };

  const handleCourseImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file, 'courseImage');
    }
  };

  const removeTeacherImage = () => {
    setTeacherImagePreview('');
    form.setValue('teacherImage', '');
    if (teacherImageInputRef.current) {
      teacherImageInputRef.current.value = '';
    }
  };

  const removeCourseImage = () => {
    setCourseImagePreview('');
    form.setValue('courseImage', '');
    if (courseImageInputRef.current) {
      courseImageInputRef.current.value = '';
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-5 right-5 font-bold" size={'lg'} variant={'outline'}>
          <FileVideoCamera strokeWidth={2.5} />
          Add Course
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tạo khóa học mới</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề khóa học</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tiêu đề khóa học..." {...field} />
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
                  <FormLabel>Mô tả về khóa học</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Nhập mô tả về khóa học..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="teacherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên thầy giáo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên thầy giáo..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Teacher Image Upload */}
            <FormField
              control={form.control}
              name="teacherImage"
              render={() => (
                <FormItem>
                  <FormLabel
                    className="block cursor-pointer"
                    onClick={() => teacherImageInputRef.current?.click()}
                  >
                    Ảnh thầy giáo
                  </FormLabel>
                  <FormControl>
                    <>
                      <input
                        ref={teacherImageInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleTeacherImageChange}
                      />
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors cursor-pointer"
                        onClick={() => teacherImageInputRef.current?.click()}
                      >
                        {teacherImagePreview ? (
                          <div className="relative">
                            <Image
                              src={teacherImagePreview}
                              alt="Teacher preview"
                              className="w-full h-32 object-cover rounded"
                              width={500}
                              height={500}
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2 h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeTeacherImage();
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="mx-auto h-8 w-8 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-500">
                              Click để chọn ảnh thầy giáo
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Course Image Upload */}
            <FormField
              control={form.control}
              name="courseImage"
              render={() => (
                <FormItem>
                  <FormLabel
                    className="block cursor-pointer"
                    onClick={() => courseImageInputRef.current?.click()}
                  >
                    Ảnh khóa học
                  </FormLabel>
                  <FormControl>
                    <>
                      <input
                        ref={courseImageInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCourseImageChange}
                      />
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors cursor-pointer"
                        onClick={() => courseImageInputRef.current?.click()}
                      >
                        {courseImagePreview ? (
                          <div className="relative">
                            <Image
                              src={courseImagePreview}
                              alt="Course preview"
                              className="w-full h-32 object-cover rounded"
                              width={500}
                              height={500}
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2 h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeCourseImage();
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="mx-auto h-8 w-8 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-500">Click để chọn ảnh khóa học</p>
                          </div>
                        )}
                      </div>
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full shadow-none">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
