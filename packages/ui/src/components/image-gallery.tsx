'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Dialog, DialogContent, DialogClose } from './ui/dialog'
import { cn } from '../lib/utils'

export interface ImageGalleryProps {
  /**
   * 图片URL列表
   */
  images: string[]
  /**
   * 自定义类名
   */
  className?: string
  /**
   * 图片标题前缀，用于生成alt文本
   */
  altPrefix?: string
}

/**
 * 图片画廊组件，支持网格布局和全屏预览
 */
export function ImageGallery({
  images,
  className,
  altPrefix = '图片'
}: ImageGalleryProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  return (
    <div className={cn('space-y-4', className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((url, index) => (
          <div 
            key={index} 
            className="relative h-48 overflow-hidden rounded-lg border border-border cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setPreviewImage(url)}
          >
            <Image
              src={url}
              alt={`${altPrefix} ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      <Dialog open={!!previewImage} onOpenChange={(open) => !open && setPreviewImage(null)}>
        <DialogContent 
          className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none shadow-none"
          showCloseButton={false} // 隐藏DialogContent自带的关闭按钮
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {previewImage && (
              <Image
                src={previewImage}
                alt="预览图片"
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain"
              />
            )}
            <DialogClose asChild>
              <div 
                className="absolute top-4 right-4 rounded-full h-10 w-10 bg-black/50 text-white hover:bg-black/70 p-0 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewImage(null);
                }}
              >
                <X className="h-5 w-5" />
              </div>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
