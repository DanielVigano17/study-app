"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface ParallaxBackgroundProps {
  dotColor?: string
  dotSize?: number
  dotCount?: number
  speed?: number
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  dotColor = "#D3D3D3", // Light gray color
  dotSize = 2,
  dotCount = 200,
  speed = 0.15,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.error("Canvas not found")
      return
    }

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      console.error("Could not get 2D context")
      return
    }

    let animationFrameId: number
    const dots: { x: number; y: number; z: number }[] = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createDots = () => {
      dots.length = 0
      for (let i = 0; i < dotCount; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 0.5 + 0.5,
        })
      }
    }

    const updateDots = () => {
      dots.forEach((dot) => {
        dot.y += speed * dot.z
        if (dot.y > canvas.height) {
          dot.y = 0
          dot.x = Math.random() * canvas.width
        }
      })
    }

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dots.forEach((dot) => {
        const radius = dotSize * dot.z
        const alpha = dot.z * 0.7 + 0.3

        ctx.fillStyle = dotColor
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const animate = () => {
      updateDots()
      drawDots()
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createDots()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      createDots()
    })

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [dotColor, dotSize, dotCount, speed])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" />
}

export default ParallaxBackground
