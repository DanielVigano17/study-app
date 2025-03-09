import { PageContainer } from "@/components/layout/page-container";

export default function QuizLayout({
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
