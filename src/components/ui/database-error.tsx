'use client';

import { AlertCircle, Database, RefreshCw } from 'lucide-react';
import { Button } from './button';

interface DatabaseErrorProps {
  onRetry?: () => void;
}

export default function DatabaseError({ onRetry }: DatabaseErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="mb-6">
          <Database className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Lỗi Kết Nối Database
        </h1>
        
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Không thể kết nối đến database. Vui lòng kiểm tra cấu hình database và thử lại.
        </p>
        
        <div className="space-y-4">
          {onRetry && (
            <Button 
              onClick={onRetry}
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Thử Lại
            </Button>
          )}
          
          <div className="text-sm text-muted-foreground">
            <p>Nếu vấn đề vẫn tiếp tục:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Kiểm tra file .env có đúng cấu hình không</li>
              <li>Đảm bảo database đang chạy</li>
              <li>Kiểm tra kết nối internet</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
