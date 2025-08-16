'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Play, Clock, User, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

interface SearchResult {
  id: string;
  title: string;
  description: string | null;
  youtubeVideoId: string;
  duration: number | null;
  courseId: string;
  courseTitle: string;
  instructorName: string;
  courseThumbnail: string;
  teacherImage: string;
  sectionTitle: string;
  sectionOrder: number;
  lessonOrder: number;
  relevanceScore?: number;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Format duration from seconds to "Xh Yp" format
  const formatDuration = (seconds: number | null): string => {
    if (!seconds) return '';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}p`;
    } else {
      return `${minutes}p`;
    }
  };

  // Search function
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      performSearch(query.trim());
    }
  };

  // Initial search when page loads with query parameter
  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Tìm kiếm Video</h1>
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Tìm kiếm video theo tên, khóa học, hoặc giảng viên..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 pr-4 h-12 text-lg"
              />
              <Button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
                disabled={!query.trim()}
              >
                Tìm kiếm
              </Button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Đang tìm kiếm...</p>
          </div>
        )}

        {!isLoading && hasSearched && (
          <div>
            {results.length > 0 ? (
              <div>
                <div className="mb-6">
                  <p className="text-muted-foreground">
                    Tìm thấy {results.length} kết quả cho "{query}"
                  </p>
                </div>
                
                <div className="grid gap-4">
                  {results.map((result) => (
                    <div
                      key={result.id}
                      className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-4">
                        {/* Thumbnail */}
                        <div className="flex-shrink-0 w-48 h-32 bg-muted rounded-lg overflow-hidden">
                          <img
                            src={result.courseThumbnail}
                            alt={result.courseTitle}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/api/placeholder/192/128';
                            }}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold line-clamp-2">
                              {result.title}
                            </h3>
                            <Button
                              size="sm"
                              variant="outline"
                              asChild
                              className="flex-shrink-0 ml-4"
                            >
                              <Link href={`/courses/${result.courseId}`}>
                                <Play className="w-4 h-4 mr-2" />
                                Xem khóa học
                              </Link>
                            </Button>
                          </div>

                          <p className="text-muted-foreground mb-3 line-clamp-2">
                            {result.description || 'Không có mô tả'}
                          </p>

                                                     <div className="flex items-center gap-6 text-sm text-muted-foreground mb-3">
                             <span className="flex items-center gap-2">
                               <BookOpen className="w-4 h-4" />
                               {result.courseTitle}
                             </span>
                             <span className="flex items-center gap-2">
                               <User className="w-4 h-4" />
                               {result.instructorName}
                             </span>
                             {result.duration && (
                               <span className="flex items-center gap-2">
                                 <Clock className="w-4 h-4" />
                                 {formatDuration(result.duration)}
                               </span>
                             )}
                             {result.relevanceScore && result.relevanceScore > 50 && (
                               <span className="flex items-center gap-2 text-green-600">
                                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                 Phù hợp cao
                               </span>
                             )}
                           </div>

                          <div className="text-xs text-muted-foreground">
                            <span className="bg-muted px-2 py-1 rounded">
                              {result.sectionTitle} - Bài {result.lessonOrder}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Không tìm thấy kết quả</h3>
                <p className="text-muted-foreground mb-4">
                  Không tìm thấy video nào phù hợp với "{query}"
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Thử tìm kiếm với từ khóa khác:</p>
                  <ul className="space-y-1">
                    <li>• Tên video cụ thể hơn</li>
                    <li>• Tên khóa học</li>
                    <li>• Tên giảng viên</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {!hasSearched && !isLoading && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Bắt đầu tìm kiếm</h3>
            <p className="text-muted-foreground">
              Nhập từ khóa để tìm kiếm video theo tên, khóa học, hoặc giảng viên
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
