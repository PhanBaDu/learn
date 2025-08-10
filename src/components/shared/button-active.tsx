import { Button } from '@/components/ui/button';
import React from 'react';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ButtonActiveProps {
  icon: LucideIcon;
  title: string;
  active: boolean;
  href: string;
}

export default function ButtonActive({ icon: Icon, title, active, href }: ButtonActiveProps) {
  return (
    <Link href={href}>
      <Button
        className="flex-col items-center gap-2 w-20 h-20 rounded-2xl shadow-none p-2"
        variant={active ? 'secondary' : 'ghost'}
        size={'icon'}
      >
        <Icon
          strokeWidth={2}
          style={{ width: '20px', height: '20px' }}
          fill={active ? 'currentColor' : 'none'}
        />
        <p className="text-xs">{title}</p>
      </Button>
    </Link>
  );
}
