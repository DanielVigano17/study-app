"use client"

import { useState } from "react"
import { Home, Search, Heart, User } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: Search, label: "Search" },
  { icon: Heart, label: "Favorites" },
  { icon: User, label: "Account" },
]

export function BottomNavigation() {
  const [active, setActive] = useState("Home")

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="relative bg-slate-950 h-16 rounded-full px-8 shadow-lg">
        <div className="flex justify-between items-center h-full max-w-md mx-auto">
          {menuItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              isActive={active === item.label}
              onClick={() => setActive(item.label)}
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
  onClick,
}: {
  icon: any
  label: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
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
    </button>
  )
}

