"use client"

import { Download, Share2, RotateCcw } from "lucide-react"

interface ResultSectionProps {
  originalImage: string
  processedImage: string
  onReset: () => void
}

export default function ResultSection({ originalImage, processedImage, onReset }: ResultSectionProps) {
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = processedImage
    link.download = "hikari-ai-upscaled.png"
    link.click()
  }

  return (
    <div className="w-full max-w-6xl mx-auto animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">✨ Enhancement Complete!</h2>
        <p className="text-gray-400">Your image has been upscaled with AI precision</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Original */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-300 text-center">Original</h3>
          <div className="relative overflow-hidden rounded-xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
            <img
              src={originalImage || "/placeholder.svg"}
              alt="Original image"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Enhanced */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-center">
            AI Enhanced
          </h3>
          <div className="relative overflow-hidden rounded-xl border border-yellow-500/30 bg-gray-900/50 backdrop-blur-sm shadow-lg shadow-yellow-500/10">
            <img
              src={processedImage || "/placeholder.svg"}
              alt="Enhanced image"
              className="w-full h-auto object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25"
        >
          <Download className="w-4 h-4" />
          Download Enhanced
        </button>

        <button className="flex items-center gap-2 px-6 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-white rounded-lg hover:bg-gray-700/80 transition-all duration-300">
          <Share2 className="w-4 h-4" />
          Share
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-white rounded-lg hover:bg-gray-700/80 transition-all duration-300"
        >
          <RotateCcw className="w-4 h-4" />
          Try Another
        </button>
      </div>
    </div>
  )
}
