'use client';

import ButtonActive from '@/components/shared/button-active';
import { sidebarPaths } from '@/constants/sidebar-paths';
import { usePathname } from 'next/navigation';

export default function SideBar() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-5">
      {sidebarPaths.map((path) => (
        <ButtonActive
          key={path.href}
          icon={path.icon}
          title={path.title}
          active={pathname === path.href}
          href={path.href}
        />
      ))}
    </div>
  );
}
