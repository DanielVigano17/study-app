"use client"

import { useState } from "react"
import { Home, Search, Heart, User, Settings, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"

const menuItems = [
  { icon: Home, label: "Home", url:"/app" },
  { icon: Settings, label: "Configurações", url:"/settings" },
  { icon: CreditCard, label: "Assinatura", url:"/billing" },
]

export function BottomNavigation() {
  const pathname = usePathname()

  const isActive = (path: string, name : string) => {
    return pathname === path
  }

  const [active, setActive] = useState("/app")

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="relative bg-slate-950 h-16 rounded-full px-8 shadow-lg">
        <div className="flex justify-between items-center h-full max-w-md mx-auto">
          {menuItems.map((item) => (
            <NavItem
              key={item.label}
              url={item.url}
              icon={item.icon}
              label={item.label}
              isActive={isActive(item.url, item.label)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function NavItem({
  icon: Icon,
  label,
  isActive,
  url,
}: {
  icon: any
  label: string
  url : string
  isActive: boolean
}) {
  return (
    <Link
      href={url}
      className={cn(
        "flex flex-col items-center justify-center transition-all",
        isActive ? "text-white scale-110" : "text-white/60 hover:text-white",
      )}
    >
      <div
        className={cn("flex items-center justify-center rounded-full p-1 transition-colors", isActive && "bg-white/10")}
      >
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-xs">{label}</span>
    </Link>
  )
}

