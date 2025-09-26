"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { JobPostingLayout } from "@/components/layout/job-posting-layout"
import { RecruiterHeader } from "@/components/layout/recruiter-header"
import { BasicInfoForm } from "@/components/job-posting/basic-info-form"
import { DEFAULT_JOB_POSTING_FORM } from "@/lib/data/mock-data"
import type { JobPostingFormData } from "@/lib/types"

export default function BasicInfoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<JobPostingFormData["basicInfo"]>(DEFAULT_JOB_POSTING_FORM.basicInfo)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handlePrevious = () => {
    router.push("/recruiter/post-job")
  }

  const handleNext = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Role name is required"
    }

    if (formData.skills.length === 0) {
      newErrors.skills = "At least one skill is required"
    }

    if (formData.numberOfOpenings < 1) {
      newErrors.numberOfOpenings = "Number of openings must be at least 1"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // TODO: Save form data to context or state management
    router.push("/recruiter/post-job/work-type")
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <RecruiterHeader userProfile={{ name: "Arun", avatar: "" }} />

      <JobPostingLayout
        title="Basic Info"
        nextHref="/recruiter/post-job/work-type"
        currentStep={0}
        onPrevious={handlePrevious}
        onNext={handleNext}
      >
        <BasicInfoForm data={formData} onChange={setFormData} errors={errors} />
      </JobPostingLayout>
    </div>
  )
}
