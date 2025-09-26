"use client"

import { WorkTypeSelector } from "@/components/forms/work-type-selector"
import type { JobPostingFormData } from "@/lib/types"

interface WorkDetailsFormProps {
  data: JobPostingFormData["workDetails"]
  onChange: (data: JobPostingFormData["workDetails"]) => void
  errors?: Record<string, string>
}

export function WorkDetailsForm({ data, onChange, errors = {} }: WorkDetailsFormProps) {
  const updateField = (field: keyof JobPostingFormData["workDetails"], value: any) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  return (
    <WorkTypeSelector
      workType={data.workType}
      workMode={data.workMode}
      interviewMethod={data.interviewMethod}
      onWorkTypeChange={(workType) => updateField("workType", workType)}
      onWorkModeChange={(workMode) => updateField("workMode", workMode)}
      onInterviewMethodChange={(method) => updateField("interviewMethod", method)}
    />
  )
}
