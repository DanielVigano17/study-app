'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function SmartStudyIcon() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center">
        <div className="w-[44px] h-[44px]" />
        <span className="ml-2 tracking-widest text-xl font-bold">
          Smart<span className="text-blue-500">Study</span>
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-center">
      <Image 
        src={resolvedTheme === 'dark' ? "/smartstudy-icon.svg" : "/smartstudy-icon-light.svg"} 
        alt="StudyApp" 
        width={44} 
        height={44} 
        className="transition-all"
      />
      <span className="ml-2 tracking-widest text-xl font-bold">
        Smart<span className="text-blue-500">Study</span>
      </span>
    </div>
  )
} 