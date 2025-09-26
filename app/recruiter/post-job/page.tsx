"use client"

import { useState } from "react"
import { JobPostingLayout } from "@/components/layout/job-posting-layout"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { FileUploadSection } from "@/components/ui/file-upload-section"

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
      <DashboardHeader />
      <JobPostingLayout title="Basic Details" nextHref="/recruiter/post-job/basic-info" currentStep={0}>
        <div className="space-y-8">
          <FileUploadSection
            onFileSelect={handleFileUpload}
            acceptedTypes={[".pdf", ".doc", ".docx"]}
            uploadedFile={uploadedFile}
            uploadProgress={uploadProgress}
          />
        </div>
      </JobPostingLayout>
    </div>
  )
}
