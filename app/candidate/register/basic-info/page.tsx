"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { PageLayout } from "@/components/layout/page-layout"
import { RegistrationPageLayout } from "@/components/layout/registration-page-layout"
import { CandidateBasicInfoContent } from "@/components/pages/candidate/candidate-basic-info-content"
import { candidateNavigationItems } from "@/lib/data"

export default function BasicInfoPage() {
  const router = useRouter()
  const [completion, setCompletion] = useState<number>(0)

  const [overallProgress, setOverallProgress] = useState<{
    resume: boolean
    phone: boolean
    personal: boolean
    education: boolean
  }>({
    resume: false,
    phone: false,
    personal: false,
    education: false,
  })

  useEffect(() => {
    const storedProgress = localStorage.getItem("candidateRegistrationProgress")
    if (storedProgress) {
      setOverallProgress(JSON.parse(storedProgress))
    }
  }, [])

  useEffect(() => {
    setOverallProgress((prevProgress) => {
      const isPersonalComplete = completion === 100
      if (prevProgress.personal !== isPersonalComplete) {
        const updatedProgress = { ...prevProgress, personal: isPersonalComplete }
        localStorage.setItem("candidateRegistrationProgress", JSON.stringify(updatedProgress))
        return updatedProgress
      }
      return prevProgress
    })
  }, [completion])

  const basePercentage = (overallProgress.resume ? 25 : 0) + (overallProgress.phone ? 25 : 0)

  const currentStepContribution = (completion / 100) * 25

  const totalCompletionPercentage = basePercentage + currentStepContribution

  return (
    <PageLayout navigationItems={candidateNavigationItems}>
      <RegistrationPageLayout
        title="Complete Basic Info "
        nextHref="/candidate/register/educational-details"
        currentStep={3} // Set currentStep to 3
        completionPercentage={completion} // Pass the completion of the current step (0-100) to RegistrationPageLayout
      >
        <CandidateBasicInfoContent onCompletionChange={setCompletion} />
      </RegistrationPageLayout>
    </PageLayout>
  )
}
