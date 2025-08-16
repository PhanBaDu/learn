'use client';

import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  videoId: string;
  title?: string;
  className?: string;
}

export default function VideoPlayer({ videoId, title, className }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Reset iframe khi videoId thay đổi
    if (iframeRef.current) {
      iframeRef.current.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    }
  }, [videoId]);

  return (
    <div className={`w-full ${className}`}>
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          ref={iframeRef}
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title || 'YouTube video player'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      {title && (
        <h3 className="text-lg font-semibold mt-4 text-center">{title}</h3>
      )}
    </div>
  );
}
