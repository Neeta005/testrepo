"use client"

import { LocationInput } from "@/components/forms/location-input"
import { FormField } from "@/components/forms/form-field"
import { Switch } from "@/components/ui/switch"
import type { JobPostingFormData } from "@/lib/types"

interface LocationFormProps {
  data: JobPostingFormData["location"]
  onChange: (data: JobPostingFormData["location"]) => void
  errors?: Record<string, string>
}

export function LocationForm({ data, onChange, errors = {} }: LocationFormProps) {
  const updateField = (field: keyof JobPostingFormData["location"], value: any) => {
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
    <div className="space-y-8">
      <LocationInput
        city={data.city}
        state={data.state}
        country={data.country}
        onLocationChange={updateLocation}
        errors={errors}
      />

      <FormField label="Transportation">
        <div className="flex items-center space-x-3">
          <Switch
            checked={data.transportProvided}
            onCheckedChange={(checked) => updateField("transportProvided", checked)}
          />
          <span className="text-white">Transportation provided by company</span>
        </div>
      </FormField>
    </div>
  )
}
