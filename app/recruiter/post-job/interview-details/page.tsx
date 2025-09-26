"use client"

import { useRouter } from "next/navigation"
import { JobPostingLayout } from "@/components/layout/job-posting-layout"
import { RecruiterHeader } from "@/components/layout/recruiter-header"
import { InterviewDetailsForm, type InterviewDetailsFormData } from "@/components/recruiter/interview-details-form"

export default function InterviewDetailsPage() {
  const router = useRouter()

  const handlePrevious = () => router.push("/recruiter/post-job/questions")
  const handleNext = () => router.push("/recruiter/post-job/review")

  const handleDataChange = (data: InterviewDetailsFormData) => {
    // Handle form data changes (e.g., save to context, localStorage, etc.)
    console.log("Interview details data:", data)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <RecruiterHeader userProfile={{ name: "Arun", avatar: "" }} />

      <JobPostingLayout
        title="Interview Details"
        nextHref="/recruiter/post-job/review"
        nextText="Review"
        currentStep={5}
        onPrevious={handlePrevious}
        onNext={handleNext}
      >
        <InterviewDetailsForm onDataChange={handleDataChange} />
      </JobPostingLayout>
    </div>
  )
}
