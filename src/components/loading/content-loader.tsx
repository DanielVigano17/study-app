"use client"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export type ContentLoaderVariant = "spinner" | "cards" | "list"

type ContentLoaderProps = {
  isLoading: boolean
  children: React.ReactNode
  /** Variante do loading: spinner (padrão), cards (grid de cards), list (linhas) */
  variant?: ContentLoaderVariant
  /** Número de itens skeleton (cards ou linhas). Padrão: 6 para cards, 5 para list */
  count?: number
  /** Fallback customizado. Ignora variant quando informado */
  fallback?: React.ReactNode
  className?: string
}

function SpinnerFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-[200px]",
        className
      )}
    >
      <div
        className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"
        aria-label="Carregando"
      />
    </div>
  )
}

function CardsSkeletonFallback({
  count = 6,
  className,
}: {
  count?: number
  className?: string
}) {
  return (
    <div
      className={cn(
        "grid gap-4 pb-24 md:grid-cols-2 md:pb-2 lg:grid-cols-3",
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="min-w-0">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-4 w-40 mt-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mt-1" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ListSkeletonFallback({
  count = 5,
  className,
}: {
  count?: number
  className?: string
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-lg border">
          <Skeleton className="h-10 w-10 rounded-md shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full max-w-[200px]" />
            <Skeleton className="h-3 w-full max-w-[140px]" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ContentLoader({
  isLoading,
  children,
  variant = "spinner",
  count,
  fallback,
  className,
}: ContentLoaderProps) {
  if (!isLoading) return <>{children}</>

  if (fallback) return <>{fallback}</>

  switch (variant) {
    case "cards":
      return <CardsSkeletonFallback count={count ?? 6} className={className} />
    case "list":
      return <ListSkeletonFallback count={count ?? 5} className={className} />
    case "spinner":
    default:
      return <SpinnerFallback className={className} />
  }
}
