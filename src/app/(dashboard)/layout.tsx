import Footer from '@/components/shared/footer';
import SideBar from '@/components/shared/side-bar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-10 pt-[100px] min-h-screen flex-col justify-between">
      <SideBar />
      <div className="ml-[96px] px-5">{children}</div>
      <Footer />
    </div>
  );
}
