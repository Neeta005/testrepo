"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { RegistrationPageLayout } from "@/components/layout/registration-page-layout"
import { recruiterNavigationItems } from "@/lib/data"
import { setRecruiterStepComplete, calcRecruiterProgressPercent } from "@/lib/progress"

export default function RecruiterReviewPage() {
  const router = useRouter()

  // Mark review step as complete on mount
  useEffect(() => {
    setRecruiterStepComplete('review', true)
  }, [])

  const percent = typeof window !== 'undefined' ? calcRecruiterProgressPercent() : 0;

  return (
    <PageLayout navigationItems={recruiterNavigationItems}>
      <RegistrationPageLayout
        title="Review & Submit"
        nextHref="/recruiter/dashboard"
        currentStep={4}
        completionPercentage={percent}
        nextButtonText="Submit"
        onNextClick={() => router.push("/recruiter/dashboard")}
      >
        <div className="text-white text-lg">Review all your details and submit your registration.</div>
      </RegistrationPageLayout>
    </PageLayout>
  )
}
