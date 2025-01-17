import { MainSidebar } from "@/app/_components/sidebar";

const layoutSettings = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="grid grid-cols-[15.2rem_1fr] min-h-screen">
      <MainSidebar/>
      {children}
    </div>
  )
}

export default layoutSettings;
