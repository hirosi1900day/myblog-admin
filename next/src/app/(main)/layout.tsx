import SideMenu from '@/components/SideMenu/SideMenu';
import StoreProvider from "../../stores/StoreProvider.tsx";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen">
      <SideMenu />
      <StoreProvider>
        <main className="bg-slate-50 flex-1 overflow-auto">{children}</main>
      </StoreProvider>
    </div>
  );
};

export default MainLayout;
