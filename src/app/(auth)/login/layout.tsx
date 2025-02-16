import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster"
import { redirect } from "next/navigation";

const layoutSettings = async ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

  const session = await auth()
  if (session) redirect("/app");

  return (
    <div className="">
        <Toaster />
        {children}
    </div>
  )
}

export default layoutSettings;
