"use client"

import React from "react"
import { FileItem } from "./file-item"
import { ProgressBar } from "./ProgressBar"

interface UploadPreviewProps {
  fileName: string
  fileSize: string
  progress: number
  error?: boolean
}

export function UploadPreview({ fileName, fileSize, progress, error }: UploadPreviewProps) {
  return (
    <div className="space-y-2">
      <FileItem name={fileName} size={fileSize} error={error} />

      {/* Progress Bar */}
      <ProgressBar value={progress} />

      <div className="text-right text-gray-400 text-sm">{progress}%</div>
    </div>
  )
}
