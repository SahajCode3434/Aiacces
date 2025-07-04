"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animated lines and particles
    const lines: Array<{
      x: number
      y: number
      dx: number
      dy: number
      opacity: number
      length: number
    }> = []

    const particles: Array<{
      x: number
      y: number
      dx: number
      dy: number
      opacity: number
      size: number
    }> = []

    // Initialize lines
    for (let i = 0; i < 8; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        length: Math.random() * 200 + 100,
      })
    }

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.2 + 0.05,
        size: Math.random() * 2 + 1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw moving lines
      lines.forEach((line) => {
        line.x += line.dx
        line.y += line.dy

        // Wrap around screen
        if (line.x < -line.length) line.x = canvas.width + line.length
        if (line.x > canvas.width + line.length) line.x = -line.length
        if (line.y < -line.length) line.y = canvas.height + line.length
        if (line.y > canvas.height + line.length) line.y = -line.length

        // Draw vertical scanline
        ctx.strokeStyle = `rgba(192, 192, 192, ${line.opacity})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(line.x, line.y + line.length)
        ctx.stroke()

        // Draw horizontal line
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(line.x + line.length * 0.5, line.y)
        ctx.stroke()
      })

      // Draw particles
      particles.forEach((particle) => {
        particle.x += particle.dx
        particle.y += particle.dy

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-20 blur-[1px]" style={{ zIndex: 1 }} />
  )
}
