"use client"

import { useRouter } from "next/navigation"
import { JobPostingLayout } from "@/components/layout/job-posting-layout"
import { RecruiterHeader } from "@/components/layout/recruiter-header"
import { WorkTypeForm, type WorkTypeFormData } from "@/components/recruiter/work-type-form"

export default function WorkTypePage() {
  const router = useRouter()

  const handlePrevious = () => {
    router.push("/recruiter/post-job/basic-info")
  }

  const handleNext = () => {
    router.push("/recruiter/post-job/responsibilities")
  }

  const handleDataChange = (data: WorkTypeFormData) => {
    // Handle form data changes (e.g., save to context, localStorage, etc.)
    console.log("Work type data:", data)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <RecruiterHeader userProfile={{ name: "Arun", avatar: "" }} />

      <JobPostingLayout
        title="Work Type"
        nextHref="/recruiter/post-job/responsibilities"
        currentStep={2}
        onPrevious={handlePrevious}
        onNext={handleNext}
      >
        <WorkTypeForm onDataChange={handleDataChange} />
      </JobPostingLayout>
    </div>
  )
}
