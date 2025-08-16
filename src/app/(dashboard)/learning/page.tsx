'use client';

import { BookOpen, FileText } from 'lucide-react';
import { useState } from 'react';
import PDFViewer from '@/components/ui/pdf-viewer';

const roadmapItems = [
  { 
    title: 'Frontend Developer', 
    isNew: false,
    pdfUrl: '/pdfs/frontend.pdf'
  },
  { 
    title: 'Backend Developer', 
    isNew: false,
    pdfUrl: '/pdfs/backend.pdf'
  },
  { 
    title: 'Full Stack Developer', 
    isNew: true,
    pdfUrl: '/pdfs/full-stack.pdf'
  },
  { 
    title: 'Mobile Developer (Android)', 
    isNew: false,
    pdfUrl: '/pdfs/android.pdf'
  },
  { 
    title: 'Mobile Developer (iOS)', 
    isNew: false,
    pdfUrl: '/pdfs/ios.pdf'
  },
  { 
    title: 'DevOps Engineer', 
    isNew: false,
    pdfUrl: '/pdfs/devops.pdf'
  },
  { 
    title: 'Data Engineer', 
    isNew: true,
    pdfUrl: '/pdfs/data-engineer.pdf'
  },
  { 
    title: 'AI Engineer', 
    isNew: true,
    pdfUrl: '/pdfs/ai-engineer.pdf'
  },
  { 
    title: 'AI Data Scientist', 
    isNew: true,
    pdfUrl: '/pdfs/ai-data-scientist.pdf'
  },
  { 
    title: 'UI/UX Designer', 
    isNew: false,
    pdfUrl: '/pdfs/ux-design.pdf'
  },
  { 
    title: 'Blockchain Developer', 
    isNew: false,
    pdfUrl: '/pdfs/blockchain.pdf'
  },
  { 
    title: 'Cyber Security', 
    isNew: false,
    pdfUrl: '/pdfs/cyber-security.pdf'
  },
  { 
    title: 'Data Analyst', 
    isNew: false,
    pdfUrl: '/pdfs/data-analyst.pdf'
  },
  { 
    title: 'Database Admin (PostgreSQL)', 
    isNew: false,
    pdfUrl: '/pdfs/postgresql-dba.pdf'
  },
  { 
    title: 'QA Engineer', 
    isNew: false,
    pdfUrl: '/pdfs/qa.pdf'
  },
  { 
    title: 'Software Architect', 
    isNew: false,
    pdfUrl: '/pdfs/software-architect.pdf'
  },
];

export default function LearningPage() {
  const [selectedRoadmap, setSelectedRoadmap] = useState<typeof roadmapItems[0] | null>(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  const handleRoadmapClick = (roadmap: typeof roadmapItems[0]) => {
    setSelectedRoadmap(roadmap);
    setIsPdfOpen(true);
  };

  const handleClosePdf = () => {
    setIsPdfOpen(false);
    setSelectedRoadmap(null);
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {roadmapItems.map((item, index) => (
            <div 
              key={index} 
              className="group cursor-pointer"
              onClick={() => handleRoadmapClick(item)}
            >
              <div className="relative bg-muted/70 rounded-xl p-5 hover:bg-muted/90 transition-colors">
                {/* Content */}
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="text-secondary-foreground font-semibold text-sm">
                    {item.title}
                  </h3>
                </div>
                {item.isNew && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    NEW
                  </div>
                )}
              </div>
            </div>
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

      {/* PDF Viewer Modal */}
      {selectedRoadmap && (
        <PDFViewer
          isOpen={isPdfOpen}
          onClose={handleClosePdf}
          pdfUrl={selectedRoadmap.pdfUrl}
          title={selectedRoadmap.title}
        />
      )}
    </div>
  );
}
