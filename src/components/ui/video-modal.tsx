'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import VideoPlayer from './video-player';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
  description?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoId,
  title,
  description,
}: VideoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
        </DialogHeader>
        <div className="mt-4">
          <VideoPlayer 
            videoId={videoId} 
            title={title}
            className="w-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
