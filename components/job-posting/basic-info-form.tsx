"use client"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SkillsInput } from "@/components/forms/skills-input"
import { FormField } from "@/components/forms/form-field"
import { POPULAR_SKILLS } from "@/lib/data/mock-data"
import type { JobPostingFormData } from "@/lib/types"

interface BasicInfoFormProps {
  data: JobPostingFormData["basicInfo"]
  onChange: (data: JobPostingFormData["basicInfo"]) => void
  errors?: Record<string, string>
}

export function BasicInfoForm({ data, onChange, errors = {} }: BasicInfoFormProps) {
  const updateField = (field: keyof JobPostingFormData["basicInfo"], value: any) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  return (
    <div className="space-y-8">
      {/* Role Name */}
      <FormField label="Role Name" required error={errors.title}>
        <Input
          value={data.title}
          onChange={(e) => updateField("title", e.target.value)}
          className={`bg-slate-800 text-white h-12 px-4 rounded-lg border ${
            errors.title ? "border-red-500" : "border-white"
          } focus:border-red-500 transition-colors`}
          placeholder="Enter role name"
        />
      </FormField>

      {/* Skills Required */}
      <SkillsInput
        label="Skills Required"
        skills={data.skills}
        onSkillsChange={(skills) => updateField("skills", skills)}
        suggestions={POPULAR_SKILLS}
        placeholder="Add required skills"
        required
        error={errors.skills}
        className={`border ${
          errors.skills ? "border-red-500" : "border-white"
        } focus:border-red-500`}
      />

      {/* Number of Openings */}
      <FormField label="No. of Opening" required error={errors.numberOfOpenings}>
        <Select
          value={data.numberOfOpenings.toString()}
          onValueChange={(value) => updateField("numberOfOpenings", Number.parseInt(value))}
        >
          <SelectTrigger
            className={` text-white h-12 w-full rounded-lg border px-2 ${
              errors.numberOfOpenings ? "border-red-500" : "border-white"
            } focus:border-red-500 transition-colors`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="text-black border-slate-700 w-full">
            {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
              <SelectItem key={num} value={num.toString()} className="text-black">
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>
    </div>
  )
}
