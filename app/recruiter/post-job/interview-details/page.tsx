"use client"

import { useRouter } from "next/navigation"
import { JobPostingLayout } from "@/components/layout/job-posting-layout"
import { RecruiterHeader } from "@/components/layout/recruiter-header"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function InterviewDetailsPage() {
  const router = useRouter()
  const [interviewMethod, setInterviewMethod] = useState("")
  const [focused, setFocused] = useState(false) // track focus for red border

  const handlePrevious = () => router.push("/recruiter/post-job/questions")
  const handleNext = () => router.push("/recruiter/post-job/review")

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
        <div className="space-y-8">
          <div className="text-gray-300 text-sm leading-relaxed">
            Below sections will not be seen by the candidates. We collect data to help your interview process.
          </div>

          <div className="space-y-4">
            <label className="text-white text-base font-medium">Explain your interview method</label>

            <Textarea
              placeholder="Text field"
              value={interviewMethod}
              onChange={(e) => setInterviewMethod(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={`min-h-[200px] text-white placeholder:text-gray-400 resize-none transition-colors border-2 ${
                focused ? "border-red-500" : "border-slate-700"
              } focus:border-red-500 focus:ring-red-500`}
            />
          </div>
        </div>
      </JobPostingLayout>
    </div>
  )
}
