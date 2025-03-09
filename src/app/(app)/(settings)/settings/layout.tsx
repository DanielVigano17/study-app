import { PageContainer } from "@/components/layout/page-container";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer>
      {children}
    </PageContainer>
  );
}
