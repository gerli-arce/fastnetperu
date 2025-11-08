"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollAnimationProps {
  children: ReactNode
  direction?: "up" | "left" | "right" | "down"
  delay?: number
  className?: string
}

export function ScrollAnimation({ children, direction = "up", delay = 0, className = "" }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          setTimeout(() => {
            if (ref.current) {
              const animationClass = {
                up: "animate-fade-in-up",
                left: "animate-slide-in-left",
                right: "animate-slide-in-right",
                down: "animate-slide-in-down",
              }[direction]
              ref.current.classList.add(animationClass)
            }
          }, delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay, direction])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
