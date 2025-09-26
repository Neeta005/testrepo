"use client"

import { useRouter } from "next/navigation"
import { JobPostingLayout } from "@/components/layout/job-posting-layout"
import { RecruiterHeader } from "@/components/layout/recruiter-header"
import { ResponsibilitiesForm, type ResponsibilitiesFormData } from "@/components/recruiter/responsibilities-form"

export default function ResponsibilitiesPage() {
  const router = useRouter()

  const handlePrevious = () => router.push("/recruiter/post-job/work-type")
  const handleNext = () => router.push("/recruiter/post-job/location")

  const handleDataChange = (data: ResponsibilitiesFormData) => {
    // Handle form data changes (e.g., save to context, localStorage, etc.)
    console.log("Responsibilities data:", data)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <RecruiterHeader userProfile={{ name: "Arun", avatar: "" }} />

      <JobPostingLayout
        title="Offers & Responsibilities"
        nextHref="/recruiter/post-job/location"
        currentStep={2}
        onPrevious={handlePrevious}
        onNext={handleNext}
      >
        <ResponsibilitiesForm onDataChange={handleDataChange} />
      </JobPostingLayout>
    </div>
  )
}
