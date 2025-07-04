"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { Upload, X } from "lucide-react"

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void
  uploadedImage: string | null
}

export default function ImageUploader({ onImageUpload, uploadedImage }: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFileChange = useCallback(
    (file: File) => {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            onImageUpload(e.target.result as string)
          }
        }
        reader.readAsDataURL(file)
      }
    },
    [onImageUpload],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleFileChange(files[0])
      }
    },
    [handleFileChange],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const clearImage = useCallback(() => {
    onImageUpload("")
  }, [onImageUpload])

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!uploadedImage ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
            isDragOver ? "border-yellow-400 bg-yellow-400/5 scale-105" : "border-gray-600 hover:border-gray-500"
          }`}
        >
          <Upload className="w-16 h-16 mx-auto mb-6 text-gray-400" />
          <h3 className="text-xl font-semibold text-white mb-2">Drop your image here</h3>
          <p className="text-gray-400 mb-6">or click to browse your files</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFileChange(file)
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25">
            Choose Image
          </button>
        </div>
      ) : (
        <div className="relative group">
          <div className="relative overflow-hidden rounded-xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
            <img
              src={uploadedImage || "/placeholder.svg"}
              alt="Uploaded preview"
              className="w-full h-auto max-h-96 object-contain"
            />
            <button
              onClick={clearImage}
              className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-300 text-sm">Image ready for upscaling</p>
          </div>
        </div>
      )}
    </div>
  )
}
