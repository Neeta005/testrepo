"use client"

import { Input } from "@/components/ui/input"
import { LocationInput } from "@/components/forms/location-input"
import { FormField } from "@/components/forms/form-field"
import type { RegistrationFormData } from "@/lib/types"

interface CompanyAddressFormProps {
  data: RegistrationFormData["recruiter"]["companyAddress"]
  onChange: (data: RegistrationFormData["recruiter"]["companyAddress"]) => void
  errors?: Record<string, string>
}

export function CompanyAddressForm({ data, onChange, errors = {} }: CompanyAddressFormProps) {
  const updateField = (field: keyof RegistrationFormData["recruiter"]["companyAddress"], value: string) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  const updateLocation = (location: { city: string; state: string; country: string }) => {
    onChange({
      ...data,
      ...location,
    })
  }

  return (
    <div className="space-y-6">
      <FormField label="Street Address" required error={errors.street}>
        <Input
          value={data.street}
          onChange={(e) => updateField("street", e.target.value)}
          className="bg-slate-800 border-red-500 text-white h-12"
          placeholder="Enter street address"
        />
      </FormField>

      <LocationInput
        city={data.city}
        state={data.state}
        country={data.country}
        onLocationChange={updateLocation}
        errors={errors}
      />

      <FormField label="Postal Code" required error={errors.postalCode}>
        <Input
          value={data.postalCode}
          onChange={(e) => updateField("postalCode", e.target.value)}
          className="bg-slate-800 border-red-500 text-white h-12"
          placeholder="Enter postal code"
        />
      </FormField>
    </div>
  )
}
