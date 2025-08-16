'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Button } from './button';
import { X, Download, ZoomIn, ZoomOut, FileText, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

export default function PDFViewer({ isOpen, onClose, pdfUrl, title }: PDFViewerProps) {
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
      setScale(1);
    }
  }, [isOpen, pdfUrl]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    link.click();
  };

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 [&>button]:hidden">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {title}
            </DialogTitle>
            <div className="flex items-center gap-2">
              {!hasError && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={zoomOut}
                    disabled={scale <= 0.5}
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm min-w-[60px] text-center">{Math.round(scale * 100)}%</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={zoomIn}
                    disabled={scale >= 3}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownload}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-auto p-4">
          <div className="flex justify-center">
            {isLoading && (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Đang tải PDF...</p>
                </div>
              </div>
            )}
            
            {hasError && (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Không thể tải PDF</h3>
                  <p className="text-muted-foreground mb-4">
                    File PDF cho lộ trình này chưa có sẵn hoặc đã bị lỗi.
                  </p>
                  <Button onClick={onClose}>
                    Đóng
                  </Button>
                </div>
              </div>
            )}

            {!hasError && (
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                className="border rounded-lg shadow-lg"
                style={{
                  width: `${100 * scale}%`,
                  height: '70vh',
                  transform: `scale(${scale})`,
                  transformOrigin: 'top center',
                  display: isLoading ? 'none' : 'block'
                }}
                title={title}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
