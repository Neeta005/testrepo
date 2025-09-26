"use client"

import { useRouter } from "next/navigation"
import { JobPostingLayout } from "@/components/layout/job-posting-layout"
import { RecruiterHeader } from "@/components/layout/recruiter-header"
import { QuestionsForm, type QuestionsFormData } from "@/components/recruiter/questions-form"

export default function QuestionsPage() {
  const router = useRouter()

  const handlePrevious = () => {
    router.push("/recruiter/post-job/location")
  }

  const handleNext = () => {
    router.push("/recruiter/post-job/interview-details")
  }

  const handleDataChange = (data: QuestionsFormData) => {
    // Handle form data changes (e.g., save to context, localStorage, etc.)
    console.log("Questions data:", data)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <RecruiterHeader userProfile={{ name: "Arun", avatar: "" }} />

      <JobPostingLayout
        title="Questions to Filter Candidates"
        nextHref="/recruiter/post-job/interview-details"
        currentStep={4}
        onPrevious={handlePrevious}
        onNext={handleNext}
      >
        <QuestionsForm onDataChange={handleDataChange} />
      </JobPostingLayout>
    </div>
  )
}
