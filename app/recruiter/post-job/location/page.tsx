"use client"

import { useRouter } from "next/navigation"
import { JobPostingLayout } from "@/components/layout/job-posting-layout"
import { RecruiterHeader } from "@/components/layout/recruiter-header"
import { LocationForm, type LocationFormData } from "@/components/recruiter/location-form"

export default function LocationPage() {
  const router = useRouter()

  const handlePrevious = () => router.push("/recruiter/post-job/responsibilities")
  const handleNext = () => router.push("/recruiter/post-job/questions")

  const handleDataChange = (data: LocationFormData) => {
    // Handle form data changes (e.g., save to context, localStorage, etc.)
    console.log("Location data:", data)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <RecruiterHeader userProfile={{ name: "Arun", avatar: "" }} />

      <JobPostingLayout
        title="Interview Location"
        nextHref="/recruiter/post-job/questions"
        currentStep={4}
        onPrevious={handlePrevious}
        onNext={handleNext}
      >
        <LocationForm onDataChange={handleDataChange} />
      </JobPostingLayout>
    </div>
  )
}
