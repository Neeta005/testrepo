"use client"
import { FileUpload } from "@/components/ui/file-upload"

interface FileUploadSectionProps {
  onFileSelect: (file: File) => void
  selectedFile: File | null
}

export function FileUploadSection({ onFileSelect, selectedFile }: FileUploadSectionProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Upload Your Resume</h2>

      <FileUpload onFileSelect={onFileSelect} acceptedFormats={["PDF", "DOC"]} maxSize={5} />

      {selectedFile && (
        <div className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded-lg">
          <p className="text-green-400 text-sm">✅ File uploaded successfully: {selectedFile.name}</p>
        </div>
      )}
    </div>
  )
}
