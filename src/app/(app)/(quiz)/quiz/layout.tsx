import { MainSidebar } from "@/app/_components/sidebar";
import { Suspense } from "react";

const layoutQuiz = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="w-full md:grid grid-cols-[16.2rem_1fr] min-h-screen">
      <MainSidebar/>
      {children}
    </div>
  )
}

export default layoutQuiz;
