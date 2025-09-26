"use client"

import { EducationForm } from "@/components/forms/education-form"
import { SkillsInput } from "@/components/forms/skills-input"
import { POPULAR_SKILLS } from "@/lib/data/mock-data"
import type { RegistrationFormData } from "@/lib/types"

interface CandidateEducationFormProps {
  data: RegistrationFormData["candidate"]["educationDetails"]
  onChange: (data: RegistrationFormData["candidate"]["educationDetails"]) => void
  errors?: Record<string, string>
}

export function CandidateEducationForm({ data, onChange, errors = {} }: CandidateEducationFormProps) {
  const updateField = (field: keyof RegistrationFormData["candidate"]["educationDetails"], value: any) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  return (
    <div className="space-y-8">
      <EducationForm
        education={data.education}
        onEducationsChange={(education) => updateField("education", education)}
      />

      <SkillsInput
        label="Skills"
        skills={data.skills}
        onSkillsChange={(skills) => updateField("skills", skills)}
        suggestions={POPULAR_SKILLS}
        placeholder="Add your skills"
        required
        error={errors.skills}
      />
    </div>
  )
}
