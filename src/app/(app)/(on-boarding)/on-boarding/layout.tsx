import { PageContainer } from "@/components/layout/page-container";
import { Toaster } from "@/components/ui/toaster";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer showSidebar={false}>
      <Toaster />
      {children}
    </PageContainer>
  );
}
