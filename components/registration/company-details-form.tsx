"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormField } from "@/components/forms/form-field"
import { INDUSTRIES, COMPANY_SIZES } from "@/lib/constants"
import type { RegistrationFormData } from "@/lib/types"

interface CompanyDetailsFormProps {
  data: RegistrationFormData["recruiter"]["companyDetails"]
  onChange: (data: RegistrationFormData["recruiter"]["companyDetails"]) => void
  errors?: Record<string, string>
}

export function CompanyDetailsForm({ data, onChange, errors = {} }: CompanyDetailsFormProps) {
  const updateField = (field: keyof RegistrationFormData["recruiter"]["companyDetails"], value: string) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  return (
    <div className="space-y-6">
      <FormField label="Company Name" required error={errors.name}>
        <Input
          value={data.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="bg-slate-800 border-red-500 text-white h-12"
          placeholder="Enter company name"
        />
      </FormField>

      <FormField label="Company Description" required error={errors.description}>
        <Textarea
          value={data.description}
          onChange={(e) => updateField("description", e.target.value)}
          className="bg-slate-800 border-red-500 text-white"
          placeholder="Describe your company..."
          rows={4}
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Industry" required error={errors.industry}>
          <Select value={data.industry} onValueChange={(value) => updateField("industry", value)}>
            <SelectTrigger className="bg-slate-800 border-red-500 text-white h-12">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {INDUSTRIES.map((industry) => (
                <SelectItem key={industry.value} value={industry.value} className="text-white">
                  {industry.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Company Size" required error={errors.size}>
          <Select value={data.size} onValueChange={(value) => updateField("size", value)}>
            <SelectTrigger className="bg-slate-800 border-red-500 text-white h-12">
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {COMPANY_SIZES.map((size) => (
                <SelectItem key={size.value} value={size.value} className="text-white">
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <FormField label="Website" error={errors.website}>
        <Input
          type="url"
          value={data.website || ""}
          onChange={(e) => updateField("website", e.target.value)}
          className="bg-slate-800 border-red-500 text-white h-12"
          placeholder="https://company.com (optional)"
        />
      </FormField>
    </div>
  )
}
