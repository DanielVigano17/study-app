"use client"

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Upload, File, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { createClient } from '@supabase/supabase-js'
import {CircleCheckBig} from 'lucide-react'

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB in bytes

export default function FileUploadDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null)
    setUploadProgress(0)
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0]
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError("O arquivo excede o limite de 50MB.")
      } else {
        setFile(selectedFile)
      }
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    maxFiles: 1,
    multiple: false
  })

  const clearFile = () => {
    setFile(null)
    setError(null)
    setUploadProgress(0)
  }

  const uploadFile = async () => {
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = file.name

      // Create a single supabase client for interacting with your database
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_PUBLISH_API_KEY || "" )

      // Criar um objeto Blob a partir do arquivo
      const fileBlob = new Blob([file], { type: file.type })

      // Usar o método upload do Supabase Storage
      const { error, data } = await supabase.storage
        .from('teste')
        .upload(filePath, fileBlob, {
          cacheControl: '3600',
          upsert: true
        })

      if (error) {
        throw error
      }

      // Arquivo foi carregado com sucesso
      console.log('Arquivo carregado:', data)

      const fileObject = supabase.storage.from('teste').getPublicUrl(data.path)

      console.log(fileObject.data.publicUrl)

      setIsUploading(false)
      clearFile()
      setIsOpen(false)
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      setError('Ocorreu um erro ao fazer o upload do arquivo.')
      setIsUploading(false)
    }
  }

  // Função para simular o progresso do upload
  const simulateProgress = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
      }
    }, 500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
            <Upload className="w-4 h-4" />
            Upload de Arquivo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload de Arquivo</DialogTitle>
        </DialogHeader>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className='mt-1'>
            O arquivo deve ter menos de 50MB.
          </AlertDescription>
        </Alert>
        <div
          {...getRootProps()}
          className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer ${
            isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">
            Arraste e solte um arquivo aqui, ou clique para selecionar
          </p>
        </div>
        <Button onClick={() => document.querySelector('input')?.click()} className="mt-4">
          Selecionar Arquivo
        </Button>
        {file && (
          <div className="mt-4">
            <h4 className="text-sm font-medium">Arquivo Selecionado:</h4>
            <div className="mt-2 text-sm text-gray-500 flex items-center justify-between">
              <span className="flex items-center">
                <File className="mr-2 h-4 w-4" />
                {file.name}
              </span>
              <Button variant="ghost" size="sm" onClick={clearFile}>
                Remover
              </Button>
            </div>
          </div>
        )}
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className='mt-1'>{error}</AlertDescription>
          </Alert>
        )}
        {isUploading && (
          <div className="mt-4">
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-sm text-gray-500 mt-2">Uploading: {uploadProgress.toFixed(0)}%</p>
          </div>
        )}
        <Button 
          onClick={() => {
            uploadFile()
            simulateProgress()
          }} 
          className="mt-4 w-full" 
          variant="outline"
          disabled={!file || isUploading}
        >
          <CircleCheckBig className='w-4 h-4'/>
          {isUploading ? 'Uploading...' : 'Fazer Upload'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}



