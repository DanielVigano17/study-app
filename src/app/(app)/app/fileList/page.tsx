import { Button } from "@/components/ui/button"
import { FileList } from "./_components/fileList"
import { FileFilters } from "./_components/fileFilters"
import { Upload } from 'lucide-react'

export default function FilesPages() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">YOUR RECENT FILES</h1>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          UPLOAD A NEW FILE
        </Button>
      </div>
      <FileFilters />
      <FileList />
    </div>
  )
}

