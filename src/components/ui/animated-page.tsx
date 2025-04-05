"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedPageProps {
  children: ReactNode
  pageKey?: string
}

export function AnimatedPage({ children, pageKey = "page" }: AnimatedPageProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
} 