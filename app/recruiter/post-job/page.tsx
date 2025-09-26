"use client"

import { useState } from "react"
import { JobPostingLayout } from "@/components/layout/job-posting-layout"
import { RecruiterHeader } from "@/components/layout/recruiter-header"
import { FileUpload } from "@/components/ui/file-upload"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function PostJobPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    // Simulate upload progress
    setUploadProgress(10)
  }

  return (
    <div className="min-h-screen bg-slate-900">
<DashboardHeader/>
      <JobPostingLayout title="Basic Details" nextHref="/recruiter/post-job/basic-info" currentStep={0}>
        <div className="space-y-8">
          {/* Upload File Section */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-medium">Upload File</h3>

            <FileUpload
              onFileSelect={handleFileUpload}
              acceptedTypes={[".pdf", ".doc", ".docx"]}
              maxSize={10 * 1024 * 1024} // 10MB
              className="h-64"
            />

            <p className="text-gray-400 text-sm text-center">Supported formats: PDF, DOC</p>

            {/* File Progress */}
            {uploadedFile && (
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                    </svg>
                  </div>
                  <span className="text-sm">File 1.pdf</span>
                  <span className="text-gray-400 text-sm">200 KB</span>
                  <div className="ml-auto">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <div className="text-right text-gray-400 text-sm">{uploadProgress}%</div>
              </div>
            )}
          </div>
        </div>
      </JobPostingLayout>
    </div>
  )
}
