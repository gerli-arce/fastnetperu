"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SliderImage {
  src: string
  alt: string
}

const sliderImages: SliderImage[] = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VD85EbPmwpp37fMG4N0sXaDEmDZiG1.png",
    alt: "Internet + TV Cable desde S/ 80.00 mensuales",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WU3V4d5t4cIhiHnr7be4hKyYCGs9Mo.png",
    alt: "Cámaras de Seguridad - Venta e Instalación",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VKvCkHOGPCay4DNdoF9vVCPHzlONR7.png",
    alt: "Navegue en la Ultravelocidad FASTNETPERU",
  },
]

export function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    setIsAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
    setIsAutoPlay(false)
  }

  return (
    <div
      className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden shadow-2xl group"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Slides */}
      <div className="relative w-full h-full bg-neutral-100">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-out flex items-center justify-center ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-neutral-900 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg opacity-0 group-hover:opacity-100"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-neutral-900 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg opacity-0 group-hover:opacity-100"
        aria-label="Siguiente slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide ? "bg-white w-8 h-3 shadow-lg" : "bg-white/50 hover:bg-white/70 w-3 h-3"
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4 z-20 text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
        {currentSlide + 1} / {sliderImages.length}
      </div>
    </div>
  )
}
