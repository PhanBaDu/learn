import CreateSectionForm from "@/features/details/components/create-section-form";
import Sections from "@/features/details/components/sections";

export default function CourseDetail() {
  return (
    <div className="w-full flex gap-5">
      <div className="w-4/6 flex flex-col gap-5">
        <Sections />
        <Sections />
        <Sections />
        <Sections />
        <Sections />
      </div>
      <div className="w-2/6 ">
        <h1>Course Detail</h1>
      </div>
      <CreateSectionForm />
    </div>
  );
}

