"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-28 right-4 md:right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label="Volver arriba"
        >
          <ArrowUp className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-125 transition-transform" />
        </button>
      )}
    </>
  )
}
