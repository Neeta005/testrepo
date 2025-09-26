"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { RegistrationPageLayout } from "@/components/layout/registration-page-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SuccessModal } from "@/components/ui/success-modal"
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

  const [newEducation, setNewEducation] = useState({
    collegeName: "",
    course: "",
    yearOfCompletion: "",
    cgpaPercentage: "",
  })

  const [skills, setSkills] = useState(["UI/UX Design", "Web Dev", "Artificial Intelligence", "Data Analysis"])
  const [skillInput, setSkillInput] = useState("")

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

  const handleAddSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill])
      setSkillInput("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleFinishRegistration = () => {
    const updatedProgress = { ...overallProgress, education: true }
    localStorage.setItem("candidateRegistrationProgress", JSON.stringify(updatedProgress))
    setOverallProgress(updatedProgress)
    setShowSuccessModal(true)
  }

  const handleGoToDashboard = () => {
    router.push("/candidate/dashboard")
  }

  const handleAddEducation = () => {
    const educationToAdd: Education = {
      id: `${educations.length + 1}`,
      level: "",
      degree: newEducation.course,
      university: newEducation.collegeName,
      startDate: "",
      endDate: newEducation.yearOfCompletion,
      cgpa: "",
      percentage: newEducation.cgpaPercentage,
    }
    setEducations([...educations, educationToAdd])
    setNewEducation({
      collegeName: "",
      course: "",
      yearOfCompletion: "",
      cgpaPercentage: "",
    })
  }

  const currentStepProgress = educations.length > 0 ? 100 : 0

  return (
    <>
      <PageLayout navigationItems={candidateNavigationItems}>
        <RegistrationPageLayout
          title="Educational Details"
          nextHref="/candidate/register/educational-details"
          currentStep={4}
          completionPercentage={currentStepProgress} // Pass currentStepProgress (0-100)
          nextButtonText="Finish & Register"
          onNextClick={handleFinishRegistration}
        >
          {/* Existing Education Cards */}
          {educations.map((education) => (
            <div key={education.id} className="rounded-lg p-6 border border-white-700 mb-4">
              {/* Top: Level and Actions */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-white-400 text-md">{education.level}</span>
                <div className="flex items-center space-x-2">
                  <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors">
                    <svg className="size-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Education Details */}
              <div className="space-y-2">
                {/* First row: Degree / CGPA / Percentage */}
                <div className="flex items-center gap-8">
                  <h3 className="text-xl font-semibold text-white">{education.degree}</h3>
                  <div className="text-white font-medium">{education.cgpa}</div>
                  <div className="text-green-400 font-medium">{education.percentage}</div>
                </div>

                {/* Second row: University / Dates */}
                <div className="flex items-center gap-8 text-gray-400 text-sm">
                  <p>{education.university}</p>
                  <p>
                    {education.startDate} - {education.endDate}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Education Form */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Education</h2>

            {/* College Name */}
            <div className="relative">
              <Input
                placeholder="Type College Name"
                value={newEducation.collegeName}
                onChange={(e) => setNewEducation({ ...newEducation, collegeName: e.target.value })}
                className=" border-white-500 text-white placeholder-gray-400 pr-10"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Courses */}
              <div className="relative">
               <select
  value={newEducation.course}
  onChange={(e) => setNewEducation({ ...newEducation, course: e.target.value })}
  className="w-full bg-slate-800 border border-white-500 text-white placeholder-gray-400 rounded-lg px-4 py-3 pr-10 appearance-none"
>
  <option value="">Courses Pursuing / Completed</option>
  <option value="computer-science">Computer Science</option>
  <option value="engineering">Engineering</option>
  <option value="business">Business</option>
</select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <button className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Year of Completion */}
              <div className="relative">
               <select
  value={newEducation.yearOfCompletion}
  onChange={(e) => setNewEducation({ ...newEducation, yearOfCompletion: e.target.value })}
  className="w-full bg-slate-800 border border-white-500 text-white placeholder-gray-400 rounded-lg px-4 py-3 pr-8 appearance-none"
>
  <option value="">Year of completion</option>
  <option value="2024">2024</option>
  <option value="2025">2025</option>
  <option value="2026">2026</option>
</select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* CGPA/Percentage */}
            <div className="relative">
              <Input
                placeholder="Text field"
                value={newEducation.cgpaPercentage}
                onChange={(e) => setNewEducation({ ...newEducation, cgpaPercentage: e.target.value })}
                className=" border-white-500 text-white placeholder-gray-400 pr-10"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleAddEducation} className="bg-orange-500 hover:bg-orange-600 px-8 py-2 rounded-lg">
                Add Education
              </Button>
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Skills</h2>

            {/* Skills Input */}
            <div className="relative">
              <Input
                placeholder="Skills"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddSkill(skillInput)
                  }
                }}
                className="border-white-500 text-white placeholder-gray-400 pr-10"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <div key={index} className="bg-gray-700 text-white px-4 py-2 rounded-full flex items-center space-x-2">
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors"
                  >
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </RegistrationPageLayout>
      </PageLayout>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onGoToDashboard={handleGoToDashboard}
      />
    </>
  )
}
