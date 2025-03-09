import { PageContainer } from "@/components/layout/page-container";

export default function BillingLayout({
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
