import { MainSidebar } from "@/app/_components/sidebar";
import { auth } from "@/auth";
import { Suspense } from "react";

const layoutHome = async ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    
  const session = await auth()
  if (!session) return <div>Not authenticated</div>

  return (
    <div className="grid grid-cols-[16.2rem_1fr] min-h-screen">
      <MainSidebar/>
      <Suspense fallback={<p>Carregando</p>}>
        {children}
      </Suspense>
    </div>
  )
}

export default layoutHome;
