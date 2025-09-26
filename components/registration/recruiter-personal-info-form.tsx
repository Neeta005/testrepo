"use client"

import { Input } from "@/components/ui/input"
import { FormField } from "@/components/forms/form-field"
import { PhoneInput } from "@/components/ui/phone-input"
import type { RegistrationFormData } from "@/lib/types"

interface RecruiterPersonalInfoFormProps {
  data: RegistrationFormData["recruiter"]["personalInfo"]
  onChange: (data: RegistrationFormData["recruiter"]["personalInfo"]) => void
  errors?: Record<string, string>
}

export function RecruiterPersonalInfoForm({ data, onChange, errors = {} }: RecruiterPersonalInfoFormProps) {
  const updateField = (field: keyof RegistrationFormData["recruiter"]["personalInfo"], value: string) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  return (
    <div className="space-y-6">
      <FormField label="Full Name" required error={errors.name}>
        <Input
          value={data.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Enter your full name"
        />
      </FormField>

      <FormField label="Email Address" required error={errors.email}>
        <Input
          type="email"
          value={data.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="Enter your email"
        />
      </FormField>

      <FormField label="Phone Number" required error={errors.phone}>
        <PhoneInput
          value={data.phone}
          onChange={(value) => updateField("phone", value)}
          placeholder="Enter your phone number"
        />
      </FormField>

      <FormField label="Position/Title" required error={errors.position}>
        <Input
          value={data.position}
          onChange={(e) => updateField("position", e.target.value)}
          placeholder="Your position in the company"
        />
      </FormField>

      <FormField label="Password" required error={errors.password}>
        <Input
          type="password"
          value={data.password}
          onChange={(e) => updateField("password", e.target.value)}
          placeholder="Create a strong password"
        />
      </FormField>
    </div>
  )
}
