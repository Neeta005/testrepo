"use client"

import { useState } from "react"
import { PageLayout } from "@/components/layout/page-layout"
import { RegistrationPageLayout } from "@/components/layout/registration-page-layout"
import { FileUpload } from "@/components/ui/file-upload"
import { candidateNavigationItems } from "@/lib/data"

export default function CandidateRegisterPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleResumeUpload = (file: File) => {
    setSelectedFile(file)
    console.log("Uploaded resume file:", file)
  }

  // Calculate completion percentage based on resume upload
  const completionPercentage = selectedFile ? 25 : 0

  return (
    <PageLayout navigationItems={candidateNavigationItems}>
      <RegistrationPageLayout
        title="Register"
        nextHref="/candidate/register/phone-verification"
        currentStep={1}
        completionPercentage={completionPercentage}
      >
        <p className="text-md text-gray-400 mb-6">Upload Your Resume</p>

        <div className="space-y-6">
          <div className="bg-slate-800rounded-xl p-8 min-h-[300px] w-full">
            <FileUpload onFileSelect={handleResumeUpload} />

            {/* Show uploaded file name */}
            {selectedFile && (
              <div className="mt-4 text-green-400 text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{selectedFile.name}</span>
              </div>
            )}
          </div>
        </div>
      </RegistrationPageLayout>
    </PageLayout>
  )
}
