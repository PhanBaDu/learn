import SideBar from '@/components/shared/side-bar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-5 flex gap-10">
      <SideBar />
      {children}
    </div>
  );
}
