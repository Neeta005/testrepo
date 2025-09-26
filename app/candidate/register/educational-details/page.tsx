"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { RegistrationPageLayout } from "@/components/layout/registration-page-layout"
import { SuccessModal } from "@/components/ui/success-modal"
import { EducationManager } from "@/components/candidate/education-manager"
import { EducationForm } from "@/components/candidate/education-form"
import { SkillsManager } from "@/components/candidate/skills-manager"
import { useCandidateProgress } from "@/hooks/use-candidate-progress"
import { candidateNavigationItems } from "@/lib/data"

interface Education {
  id: string
  level: string
  degree: string
  university: string
  startDate: string
  endDate: string
  cgpa: string
  percentage: string
}

export default function EducationalDetailsPage() {
  const router = useRouter()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [educations, setEducations] = useState<Education[]>([
    {
      id: "1",
      level: "Under graduate",
      degree: "BSC Computer Science",
      university: "Harvard University",
      startDate: "April 2019",
      endDate: "June 2021",
      cgpa: "3.5/4.0",
      percentage: "85%",
    },
  ])
  const [skills, setSkills] = useState(["UI/UX Design", "Web Dev", "Artificial Intelligence", "Data Analysis"])

  const { updateProgress } = useCandidateProgress()

  const handleAddEducation = (education: Education) => {
    setEducations([...educations, education])
  }

  const handleFinishRegistration = () => {
    updateProgress("education", true)
    setShowSuccessModal(true)
  }

  const handleGoToDashboard = () => {
    router.push("/candidate/dashboard")
  }

  const currentStepProgress = educations.length > 0 ? 100 : 0

  return (
    <>
      <PageLayout navigationItems={candidateNavigationItems}>
        <RegistrationPageLayout
          title="Educational Details"
          nextHref="/candidate/register/educational-details"
          currentStep={4}
          completionPercentage={currentStepProgress}
          nextButtonText="Finish & Register"
          onNextClick={handleFinishRegistration}
        >
          <EducationManager educations={educations} onEducationsChange={setEducations} />

          <EducationForm onAddEducation={handleAddEducation} />

          <SkillsManager skills={skills} onSkillsChange={setSkills} />
        </RegistrationPageLayout>
      </PageLayout>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onGoToDashboard={handleGoToDashboard}
      />
    </>
  )
}
