"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { JobPostingLayout } from "@/components/layout/job-posting-layout"
import { RecruiterHeader } from "@/components/layout/recruiter-header"
import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"

export default function WorkTypePage() {
  const router = useRouter()
  const [selectedWorkMode, setSelectedWorkMode] = useState("freelancer")
  const [workType, setWorkType] = useState("part-time")
  const [interviewMode, setInterviewMode] = useState("face-to-face")

  const handlePrevious = () => {
    router.push("/recruiter/post-job/basic-info")
  }

  const handleNext = () => {
    router.push("/recruiter/post-job/responsibilities")
  }

  // Custom Radio Circle
  const CustomRadio = ({ selected }: { selected: boolean }) => (
    <span
      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
        selected ? "border-red-500" : "border-gray-400"
      }`}
    >
      {selected && <span className="w-2.5 h-2.5 rounded-full bg-red-500" />}
    </span>
  )

  return (
    <div className="min-h-screen bg-slate-900">
      <RecruiterHeader userProfile={{ name: "Arun", avatar: "" }} />

      <JobPostingLayout
        title="Work Type"
        nextHref="/recruiter/post-job/responsibilities"
        currentStep={2}
        onPrevious={handlePrevious}
        onNext={handleNext}
      >
        <div className="space-y-8">
          {/* Work Mode (Full description cards) */}
          <div className="space-y-4">
            <Label className="text-white text-base">Choose your work type</Label>

            <RadioGroup value={selectedWorkMode} onValueChange={setSelectedWorkMode}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    value: "freelancer",
                    title: "Freelancer",
                    description:
                      "This mode is for executing a specific job in a defined period. This has more clear requirement given for delivery to be done.",
                  },
                  {
                    value: "hybrid",
                    title: "Hybrid",
                    description:
                      "This mode is to select a full time employee who would be working in Office and from home.",
                  },
                  {
                    value: "remote",
                    title: "Remote",
                    description:
                      "This mode is to select a full time or parttime employee who would be working from anywhere.",
                  },
                ].map((option) => (
                  <Card
                    key={option.value}
                    className={`cursor-pointer transition-colors border-2 ${
                      selectedWorkMode === option.value
                        ? "border-red-500 bg-slate-900"
                        : "border-slate-700 bg-slate-900 hover:border-slate-600"
                    }`}
                    onClick={() => setSelectedWorkMode(option.value)}
                  >
                    <CardContent className="p-5 flex items-start gap-3">
                      <CustomRadio selected={selectedWorkMode === option.value} />
                      <div className="space-y-2">
                        <h3 className="text-white font-medium">{option.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{option.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Work Type (controlled width + medium height) */}
          <div className="space-y-4">
            <Label className="text-white text-base">Work Type</Label>
            <RadioGroup value={workType} onValueChange={setWorkType}>
              <div className="flex gap-4">
                {[
                  { value: "part-time", label: "Part-time", icon: "/images/image 143 (1).png" },
                  { value: "full-time", label: "Full-time", icon: "/images/image 144 (1).png" },
                ].map((option) => (
                  <Card
                    key={option.value}
                    className={`w-44 cursor-pointer transition-colors border-2 ${
                      workType === option.value
                        ? "border-red-500 bg-slate-900"
                        : "border-slate-700 bg-slate-900 hover:border-slate-600"
                    }`}
                    onClick={() => setWorkType(option.value)}
                  >
                    <CardContent className="px-4 py-3 flex items-center gap-3 h-1">
                      <CustomRadio selected={workType === option.value} />
                      <span className="text-white text-sm">{option.label}</span>
                      <Image
                        src={option.icon || "/placeholder.svg"}
                        alt={option.label}
                        width={20}
                        height={20}
                        className="object-contain ml-auto"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Mode of Interview (controlled width + medium height) */}
          <div className="space-y-4">
            <Label className="text-white text-base">Mode of Interview</Label>
            <RadioGroup value={interviewMode} onValueChange={setInterviewMode}>
              <div className="flex gap-4">
                {[
                  { value: "face-to-face", label: "Face-to-Face", icon: "/images/communication 1 (1).png" },
                  { value: "video-call", label: "Video Call", icon: "/images/Group 1171276234 (1).png" },
                ].map((option) => (
                  <Card
                    key={option.value}
                    className={`w-52 cursor-pointer transition-colors border-2 ${
                      interviewMode === option.value
                        ? "border-red-500 bg-slate-900"
                        : "border-slate-700 bg-slate-900 hover:border-slate-600"
                    }`}
                    onClick={() => setInterviewMode(option.value)}
                  >
                    <CardContent className="px-4 py-3 flex items-center gap-3 h-1">
                      <CustomRadio selected={interviewMode === option.value} />
                      <span className="text-white text-sm">{option.label}</span>
                      <Image
                        src={option.icon || "/placeholder.svg"}
                        alt={option.label}
                        width={20}
                        height={20}
                        className="object-contain ml-auto"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>
      </JobPostingLayout>
    </div>
  )
}
