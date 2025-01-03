import { Share, Download, MoreVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { File } from 'lucide-react'

interface File {
  id: string
  title: string
  artist: string
  size: string
}

const files: File[] = [
  {
    id: "1",
    title: "Ain't My Fault",
    artist: "Zara Larsson",
    size: "7.22 MB"
  },
  {
    id: "2", 
    title: "There's Nothing Holdin' Me Back",
    artist: "Shawn Mendes",
    size: "13.25 MB"
  },
  {
    id: "3",
    title: "Titanium (feat. Sia)",
    artist: "David Guetta",
    size: "4.55 MB"
  },
  {
    id: "4",
    title: "Mars",
    artist: "John Grant",
    size: "6.12 MB"
  },
  {
    id: "5",
    title: "Flip [Free Download]",
    artist: "Bro Safari X Boombox Cartel",
    size: "5.34 MB"
  }
]

export function FileList() {
  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg border"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <File className='h-4 w-4'/>
            </div>
            <div>
              <div className="font-medium">
                {file.artist} - {file.title}
              </div>
              <div className="text-sm text-gray-500">{file.size}</div>
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

