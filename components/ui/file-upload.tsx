"use client"

import Image from "next/image"
import { useState, useCallback } from "react"
import type React from "react"
import { Button } from "./button"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  acceptedFormats?: string[]
  maxSize?: number // in MB
  className?: string
}

export function FileUpload({
  onFileSelect,
  acceptedFormats = ["PDF", "DOC"],
  maxSize = 5,
  className = "",
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelection(files[0])
    }
  }, [])

  const handleFileSelection = (file: File) => {
    setError(null)

    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`)
      return
    }

    const fileExtension = file.name.split(".").pop()?.toUpperCase()
    if (fileExtension && !acceptedFormats.includes(fileExtension)) {
      setError(`Only ${acceptedFormats.join(", ")} files are supported`)
      return
    }

    onFileSelect(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelection(files[0])
    }
  }

  return (
    <div className={className}>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors border-red-500 ${
          isDragOver ? "bg-red-500/10" : "bg-slate-800/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <Image
              src="\images\Vector.png" // ✅ Make sure the file exists in public/images
              alt="Upload Icon"
              width={48}
              height={48}
              priority
            />
          </div>

          <div>
            <p className="text-white text-lg mb-2">Drag and drop your resume here</p>
            <Button
              variant="outline"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:bg-orange-600 text-white border-orange-500"
              onClick={() => document.getElementById("file-input")?.click()}
            >
              Browse Files
            </Button>
          </div>

          <p className="text-gray-400 text-sm">Supported formats: {acceptedFormats.join(", ")}</p>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg flex items-center gap-2">
          <span className="text-red-500">⚠️</span>
          <p className="text-red-400 text-sm">{error}</p>
          <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-300">
            Try again
          </button>
        </div>
      )}

      <input
        id="file-input"
        type="file"
        accept={acceptedFormats.map((format) => `.${format.toLowerCase()}`).join(",")}
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  )
}
