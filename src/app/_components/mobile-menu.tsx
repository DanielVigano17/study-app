"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Home, Settings, HelpCircle, LogOut, Menu } from "lucide-react"

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: HelpCircle, label: "Help", href: "/help" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-4">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-accent"
              onClick={() => setOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </a>
          ))}
          <Button variant="ghost" className="justify-start gap-2" onClick={() => setOpen(false)}>
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

