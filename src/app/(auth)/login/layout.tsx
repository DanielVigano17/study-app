import { auth } from "@/auth";
import { PageContainer } from "@/components/layout/page-container";
import { Toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session) redirect("/app");

  return (
    <PageContainer showSidebar={false}>
      <Toaster />
      {children}
    </PageContainer>
  );
}
