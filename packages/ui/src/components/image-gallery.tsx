"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@repo/ui/lib/utils"

interface ImageItem {
  id: string
  src: string
  alt: string
  thumbnail?: string
}

interface ImageGalleryProps {
  images: ImageItem[]
  columns?: number
  gap?: number
  className?: string
}

export function ImageGallery({ images, columns = 3, gap = 4, className }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // 防止背景滚动
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isFullscreen])

  const openFullscreen = (index: number) => {
    setSelectedIndex(index)
    setIsFullscreen(true)
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
    setSelectedIndex(null)
  }

  const navigatePrevious = useCallback(() => {
    if (selectedIndex === null) return
    const newIndex = selectedIndex === 0 ? images.length - 1 : selectedIndex - 1
    setSelectedIndex(newIndex)
  }, [selectedIndex, images])

  const navigateNext = useCallback(() => {
    if (selectedIndex === null) return
    const newIndex = selectedIndex === images.length - 1 ? 0 : selectedIndex + 1
    setSelectedIndex(newIndex)
  }, [selectedIndex, images])

  // 处理键盘事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return

      switch (e.key) {
        case "Escape":
          closeFullscreen()
          break
        case "ArrowLeft":
          navigatePrevious()
          break
        case "ArrowRight":
          navigateNext()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen, navigateNext, navigatePrevious, selectedIndex])


  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6",
  }

  const gapClass = `gap-${gap}`

  return (
    <>
      {/* 网格布局 */}
      <div className={cn("grid", gridCols[Math.min(columns, 6) as keyof typeof gridCols], gapClass, className)}>
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openFullscreen(index)}
          >
            <Image
              src={image.thumbnail || image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 hover:bg-black/10" />
          </motion.div>
        ))}
      </div>

      {/* 全屏预览 */}
      <AnimatePresence>
        {isFullscreen && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed h-full inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeFullscreen}
          >
            {/* 关闭按钮 */}
            <button
              className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                closeFullscreen()
              }}
            >
              <X size={24} />
            </button>

            {/* 左箭头 */}
            <button
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 disabled:opacity-50"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                navigatePrevious()
              }}
              disabled={images.length <= 1}
            >
              <ChevronLeft size={24} />
            </button>

            {/* 右箭头 */}
            <button
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 disabled:opacity-50"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                navigateNext()
              }}
              disabled={images.length <= 1}
            >
              <ChevronRight size={24} />
            </button>

            {/* 图片容器 */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIndex].src || "/placeholder.svg"}
                alt={images[selectedIndex].alt}
                width={1200}
                height={800}
                className="h-auto max-h-[90vh] w-auto max-w-[90vw] object-contain"
                priority
              />
            </motion.div>

            {/* 图片计数器 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-white">
              {selectedIndex + 1} / {images.length}
            </div>

            {/* 缩略图导航 */}
            <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 space-x-2 overflow-x-auto px-4">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  className={cn(
                    "relative h-12 w-12 flex-shrink-0 overflow-hidden rounded border-2 transition-all",
                    index === selectedIndex
                      ? "border-white scale-110"
                      : "border-transparent opacity-60 hover:opacity-100",
                  )}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedIndex(index)
                  }}
                >
                  <Image
                    src={image.thumbnail || image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
