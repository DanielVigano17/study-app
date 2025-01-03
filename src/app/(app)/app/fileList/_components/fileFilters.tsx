"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, LayoutGrid, FileText } from 'lucide-react'
import Link from 'next/link'

export function FileFilters() {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="text-sm bg-secondary">
          FILES
        </Button>
        <Link href="/app/flashcards">
          <Button variant="ghost" className="text-sm text-gray-500">
            <FileText className="w-4 h-4 mr-2" />
            FLASHCARDS
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              ORDER BY
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Name</DropdownMenuItem>
            <DropdownMenuItem>Date</DropdownMenuItem>
            <DropdownMenuItem>Size</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon">
          <LayoutGrid className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

