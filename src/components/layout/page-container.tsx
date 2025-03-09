'use client'

import { MainSidebar } from "@/app/_components/sidebar"
import { cn } from "@/lib/utils"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
  contentClassName?: string
  showSidebar?: boolean
}

export function PageContainer({
  children,
  className,
  contentClassName,
  showSidebar = true,
}: PageContainerProps) {
  return (
    <div className={cn(
      "w-screen min-h-screen",
      showSidebar && "md:grid md:grid-cols-[18.2rem_1fr]",
      className
    )}>
      {showSidebar && <MainSidebar />}
        {children}
    </div>
  )
} 