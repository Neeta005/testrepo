"use client"

import React from "react"
import { FileUpload } from "./file-upload"
import { UploadPreview } from "./upload-preview"

interface FileUploadSectionProps {
  onFileSelect: (file: File) => void
  acceptedTypes: string[]
  uploadedFile: File | null
  uploadProgress: number
}

export function FileUploadSection({
  onFileSelect,
  acceptedTypes,
  uploadedFile,
  uploadProgress,
}: FileUploadSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-white text-lg font-medium">Upload File</h3>

      <FileUpload
        onFileSelect={onFileSelect}
        acceptedTypes={acceptedTypes}
        maxSize={10 * 1024 * 1024} // 10MB
        className="h-64"
      />

      <p className="text-gray-400 text-sm text-center">Supported formats: PDF, DOC</p>

      {uploadedFile && (
        <UploadPreview
          fileName={uploadedFile.name}
          fileSize={`${(uploadedFile.size / 1024).toFixed(1)} KB`}
          progress={uploadProgress}
        />
      )}
    </div>
  )
}
