import { PageContainer } from "@/components/layout/page-container"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PageContainer>
      {children}
    </PageContainer>
  )
}
