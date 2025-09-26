"use client"

import { useState } from "react"
import { FileUpload } from "@/components/ui/file-upload"

interface FileUploadSectionProps {
  onFileSelect: (file: File) => void
  uploadProgress?: number
}

export function FileUploadSection({ onFileSelect, uploadProgress = 0 }: FileUploadSectionProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    onFileSelect(file)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-lg font-medium mb-4">Upload File</h2>

        <FileUpload onFileSelect={handleFileSelect} acceptedFormats={["PDF", "DOC"]} maxSize={5} className="w-full" />
      </div>

      {selectedFile && (
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-white">
            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">File 1.pdf</p>
              <p className="text-xs text-gray-400">200 KB</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{uploadProgress}%</span>
          </div>
        </div>
      )}
    </div>
  )
}
