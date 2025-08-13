import Header from "@/features/details/components/header";

export default function CourseDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-10 pt-[100px] min-h-screen flex-col justify-between">
      <Header />
      <div className="px-5">{children}</div>
    </div>
  );
}
