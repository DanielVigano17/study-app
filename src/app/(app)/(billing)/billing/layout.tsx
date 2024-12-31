import { MainSidebar } from "@/app/_components/sidebar";
import { Suspense } from "react";

const layoutBilling = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="grid grid-cols-[16.2rem_1fr] min-h-screen">
      <MainSidebar/>
      <Suspense fallback={<p>Carregando</p>}>
        {children}
      </Suspense>
    </div>
  )
}

export default layoutBilling;
