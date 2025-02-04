"use client"
import { Share, Download, MoreVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { File as FileIcon } from 'lucide-react'
import { File } from '@/domain/entities/File'
import Link from 'next/link'
import { FileFilters } from './fileFilters'

export function FileList({files} : { files : File [] | null }) {

  return (
      <div className="space-y-2 h-96">
      {files && files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg border"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileIcon className='h-4 w-4'/>
            </div>
            <div>
              <div className="font-medium">
                {file.fileName}
              </div>
              <div className="text-sm text-gray-500"><Link href={file.url}>Vizualizar</Link></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="destructive" size="sm" className="gap-2">
              <Share className="w-4 h-4" />
              SHARE
            </Button>
            <Button size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              DOWNLOAD
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

