import {  BookOpen } from 'lucide-react';
import Link from 'next/link';

const roadmapItems = [
  { title: 'Frontend Developer', isNew: false },
  { title: 'Backend Developer', isNew: false },
  { title: 'Full Stack Developer', isNew: true },
  { title: 'Mobile Developer', isNew: false },
  { title: 'DevOps Engineer', isNew: false },
  { title: 'Data Engineer', isNew: true },
  { title: 'AI Engineer', isNew: true },
  { title: 'UI/UX Designer', isNew: false },
  { title: 'Product Manager', isNew: false },
  { title: 'Game Developer', isNew: false },
  { title: 'Blockchain Developer', isNew: false },
  { title: 'Cyber Security', isNew: false },
  { title: 'Machine Learning', isNew: false },
  { title: 'Cloud Engineer', isNew: false },
  { title: 'Database Admin', isNew: false },
  { title: 'System Admin', isNew: false },
  { title: 'QA Engineer', isNew: false },
  { title: 'Technical Writer', isNew: false },
  { title: 'Engineering Manager', isNew: false },
  { title: 'Software Architect', isNew: false },
  { title: 'Data Scientist', isNew: false },
  { title: 'Data Analyst', isNew: false },
];

export default function LearningPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="text-center py-16 px-4">
        <h1 className="text-xl md:text-6xl font-bold text-foreground mb-6">
          Lộ Trình Học Tập
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Khám phá các lộ trình học tập được thiết kế bởi cộng đồng để giúp bạn định hướng 
          và phát triển kỹ năng trong lĩnh vực công nghệ thông tin.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {roadmapItems.map((item, index) => (
            <Link 
              key={index} 
              href={`/learning/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="group"
            >
              <div className="relative bg-muted/70 rounded-xl p-5 cursor-pointer">
                {/* Content */}
                <div className="flex items-center gap-3">
                  <h3 className="text-secondary-foreground font-semibold text-sm">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="text-center py-8 px-4">
        <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
          <BookOpen className="w-5 h-5" />
          <span className="text-sm">Được tạo bởi cộng đồng học tập</span>
        </div>
        <p className="text-gray-400 text-sm">
          Các lộ trình được cập nhật thường xuyên để phù hợp với xu hướng công nghệ mới nhất
        </p>
      </div>
    </div>
  );
}
