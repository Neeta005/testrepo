"use client"

import Image from "next/image"
import { ProgressCircle } from "@/components/ui/progress-circle"
import { StepIndicator } from "@/components/ui/step-indicator"
import { FileUpload } from "@/components/ui/file-upload"
import { Button } from "@/components/ui/button"
import { registrationSteps } from "@/lib/data"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function CandidateRegisterContent() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const router = useRouter()
  const [stepCompletion, setStepCompletion] = useState({
    resume: false,
    phone: false,
    personal: false,
    education: false,
  })

  useEffect(() => {
    const storedCompletion = localStorage.getItem("candidateRegistrationProgress")
    if (storedCompletion) {
      setStepCompletion(JSON.parse(storedCompletion))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("candidateRegistrationProgress", JSON.stringify(stepCompletion))
  }, [stepCompletion])

  const hasResume = !!selectedFile

  useEffect(() => {
    setStepCompletion((prev) => ({ ...prev, resume: hasResume }))
  }, [hasResume])

  const currentSteps = registrationSteps.map((step, index) => ({
    ...step,
    completed: stepCompletion[step.id as keyof typeof stepCompletion],
  }))

  const handleResumeUpload = (file: File) => {
    setSelectedFile(file)
    console.log("Uploaded resume file:", file)
  }

  const completedStepsCount = Object.values(stepCompletion).filter(Boolean).length
  const percent = (completedStepsCount / registrationSteps.length) * 100

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-semibold text-white ml-28">Register</h1>

        <div className="w-full flex justify-center mt-6">
          <Link href="/candidate/register/phone-verification">
            <Button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold px-8 py-2 rounded-md shadow-md hover:opacity-90">
              Next
            </Button>
          </Link>
        </div>
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden lg:grid grid-cols-[60px_500px_60px_1fr] gap-x-8 items-start">
        {/* Left Arrow */}
        <div className="flex justify-start mt-50">
          <button
            className="p-2 hover:bg-red-500/10 transition-colors"
            aria-label="Previous"
            onClick={() => router.push("/candidate/register")}
          >
            <Image src="/images/arrowleft.png" alt="Left Arrow" width={50} height={50} priority />
          </button>
        </div>

        {/* Resume Upload Card */}
    {/* Resume Upload Card */}
<div className="rounded-xl p-6 w-full min-h-[500px]">
  <h2 className="text-xl font-semibold text-white mb-4">Upload Your Resume</h2>
  <FileUpload onFileSelect={handleResumeUpload} />

  {/* Show uploaded file name */}
  {selectedFile && (
    <div className="mt-4 text-green-400 text-sm flex items-center gap-2">
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span>{selectedFile.name}</span>
    </div>
  )}
</div>


        {/* Right Arrow */}
        <div className="flex justify-start mt-50">
          <button
            className="p-2 hover:bg-red-500/10 transition-colors"
            aria-label="Next"
            onClick={() => router.push("/candidate/register/phone-verification")}
          >
            <Image src="/images/arrowright.png" alt="Right Arrow" width={50} height={50} priority />
          </button>
        </div>

        {/* Progress Section */}
        <div className="bg-white/10 border border-white rounded-2xl p-4 w-full max-w-xs mx-auto min-h-[400px] flex flex-col justify-center items-center">
          <div className="flex justify-center mb-6">
            <ProgressCircle percentage={percent} />
          </div>

          <StepIndicator steps={currentSteps} currentStep={0} className="space-y-4 text-white" />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-10">
        <div className="bg-slate-800 border-2 border-dashed border-red-500 rounded-xl p-8 min-h-[450px] w-full max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-white mb-4">Upload Your Resume</h2>
          <FileUpload onFileSelect={handleResumeUpload} />
        </div>

        <div className="backdrop-blur-md rounded-2xl p-2">
          <div className="flex justify-center mb-6">
            <ProgressCircle percentage={percent} />
          </div>

          <StepIndicator steps={currentSteps} currentStep={0} className="space-y-4 text-white" />
        </div>
      </div>
    </div>
  )
}
