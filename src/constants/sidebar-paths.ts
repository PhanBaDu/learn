import { GraduationCap, LayoutGrid, LucideIcon, Waypoints } from 'lucide-react';

interface SidebarPaths {
  href: string;
  icon: LucideIcon;
  title: string;
  active: boolean;
}

export const sidebarPaths: SidebarPaths[] = [
  {
    href: '/',
    icon: LayoutGrid,
    title: 'Trang chủ',
    active: true,
  },
  {
    href: '/learning',
    icon: Waypoints,
    title: 'Lộ trình',
    active: false,
  },
  {
    href: '/blog',
    icon: GraduationCap,
    title: 'Bài viết',
    active: false,
  },
];
