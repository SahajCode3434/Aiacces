"use client"

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-gray-700 rounded-full animate-spin border-t-yellow-400"></div>

        {/* Inner ring */}
        <div className="absolute inset-2 w-12 h-12 border-4 border-gray-800 rounded-full animate-spin border-t-yellow-500 animate-reverse"></div>

        {/* Center dot */}
        <div className="absolute inset-6 w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-pulse"></div>
      </div>

      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-white mb-2">Enhancing your image...</h3>
        <p className="text-gray-400 text-sm">AI is working its magic ✨</p>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-gray-800 rounded-full mt-4 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}
