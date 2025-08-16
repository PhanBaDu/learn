'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Play, Clock, User } from 'lucide-react';
import Link from 'next/link';
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

export default function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
      return;
    }

    setIsLoading(true);
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

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < results.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleResultClick(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowResults(false);
      setSelectedIndex(-1);
    }
  };

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    router.push(`/courses/${result.courseId}`);
    setShowResults(false);
    setQuery('');
    setSelectedIndex(-1);
  };

  // Handle Enter key to go to search page
  const handleEnterKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !results.length) {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        setShowResults(false);
        setQuery('');
      }
    }
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative flex-1 max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Tìm kiếm video theo tên, khóa học, hoặc giảng viên..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setShowResults(true)}
          onKeyDown={(e) => {
            handleKeyDown(e);
            handleEnterKey(e);
          }}
          className="pl-10 pr-4 h-11 rounded-xl shadow-none"
        />
      </div>

      {/* Search Results Dropdown */}
      {showResults && (query.trim() || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              Đang tìm kiếm...
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => (
                <div
                  key={result.id}
                  className={`px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors ${
                    index === selectedIndex ? 'bg-muted/50' : ''
                  }`}
                  onClick={() => handleResultClick(result)}
                >
                  <div className="flex items-start gap-3">
                    {/* Thumbnail */}
                    <div className="flex-shrink-0 w-16 h-12 bg-muted rounded-lg overflow-hidden">
                      <img
                        src={result.courseThumbnail}
                        alt={result.courseTitle}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/api/placeholder/64/48';
                        }}
                      />
                    </div>

                                         {/* Content */}
                     <div className="flex-1 min-w-0">
                       <h4 className="font-medium text-sm line-clamp-1">
                         {result.title}
                       </h4>
                       <p className="text-xs text-muted-foreground line-clamp-1">
                         {result.courseTitle}
                       </p>
                       <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                         <span className="flex items-center gap-1">
                           <User className="w-3 h-3" />
                           {result.instructorName}
                         </span>
                         {result.duration && (
                           <span className="flex items-center gap-1">
                             <Clock className="w-3 h-3" />
                             {formatDuration(result.duration)}
                           </span>
                         )}
                         {result.relevanceScore && result.relevanceScore > 50 && (
                           <span className="flex items-center gap-1 text-green-600">
                             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                             Phù hợp
                           </span>
                         )}
                       </div>
                     </div>

                    {/* Play icon */}
                    <div className="flex-shrink-0">
                      <Play className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="p-4 text-center text-muted-foreground">
              Không tìm thấy video nào phù hợp
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
