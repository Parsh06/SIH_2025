"use client"

import { useEffect, useState } from "react"
import { Leaf } from "lucide-react"

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center space-y-6">
        <div className="relative">
          <Leaf className="w-16 h-16 text-primary mx-auto animate-pulse" />
          <div className="absolute inset-0 animate-spin">
            <div className="w-20 h-20 border-2 border-primary/20 border-t-primary rounded-full"></div>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-primary">Krishi Sakhi</h1>
          <p className="text-muted-foreground">Your Digital Farming Companion</p>
        </div>
        <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
