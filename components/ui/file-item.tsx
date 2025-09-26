"use client"

import React from "react"

interface FileItemProps {
  name: string
  size: string
  error?: boolean
}

export function FileItem({ name, size, error }: FileItemProps) {
  return (
    <div className="flex items-center gap-3 text-white">
      {/* File Icon */}
      <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
        </svg>
      </div>

      {/* File Details */}
      <span className="text-sm">{name}</span>
      <span className="text-gray-400 text-sm">{size}</span>

      {/* Error Icon */}
      {error && (
        <div className="ml-auto">
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">!</span>
          </div>
        </div>
      )}
    </div>
  )
}
