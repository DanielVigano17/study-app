import { MainSidebar } from "@/app/_components/sidebar";
import { auth } from "@/auth";
import { Redirect } from "next";
import Link from "next/link";
const layoutHome = async ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    
  const session = await auth()
  if (!session) return <div><Link href={"/login"}>Fazer login</Link></div>

  return (
    <div className="w-screen md:grid grid-cols-[16.2rem_1fr] min-h-screen">
      <MainSidebar/>
        {children}
    </div>
  )
}

export default layoutHome;
