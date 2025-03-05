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
import DialogNewFile from "./DialogNewFile"
import { File } from '@/domain/entities/File'

export function FileFilters({materiaId} : {materiaId : string}) {

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4 overflow-x-auto">
        <Button variant="ghost" className="text-sm bg-secondary whitespace-nowrap">
          Arquivos
        </Button>
        <Link href={`/app/flashcards/${materiaId}`}>
          <Button variant="ghost" className="text-sm text-gray-500 whitespace-nowrap">
            <FileText className="w-4 h-4 mr-2" />
            FLASHCARDS
          </Button>
        </Link>
        <Link href={`/app/questionario/${materiaId}`}>
          <Button variant="ghost" className="text-sm text-gray-500 whitespace-nowrap">
            <FileText className="w-4 h-4 mr-2" />
            QUESTIONÁRIOS
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <LayoutGrid className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

