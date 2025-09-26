"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormField } from "./form-field"

interface LocationInputProps {
  city: string
  state: string
  country: string
  onLocationChange: (location: { city: string; state: string; country: string }) => void
  errors?: {
    city?: string
    state?: string
    country?: string
  }
}

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
]

const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Singapore",
  "UAE",
  "Other",
]

export function LocationInput({ city, state, country, onLocationChange, errors = {} }: LocationInputProps) {
  const updateLocation = (field: string, value: string) => {
    onLocationChange({
      city,
      state,
      country,
      [field]: value,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FormField label="City" required error={errors.city}>
        <Input
          value={city}
          onChange={(e) => updateLocation("city", e.target.value)}
          className="bg-slate-800 border-red-500 text-white h-12"
          placeholder="Enter city"
        />
      </FormField>

      <FormField label="State" required error={errors.state}>
        <Select value={state} onValueChange={(value) => updateLocation("state", value)}>
          <SelectTrigger className="bg-slate-800 border-red-500 text-white h-12">
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            {INDIAN_STATES.map((stateName) => (
              <SelectItem key={stateName} value={stateName} className="text-white">
                {stateName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Country" required error={errors.country}>
        <Select value={country} onValueChange={(value) => updateLocation("country", value)}>
          <SelectTrigger className="bg-slate-800 border-red-500 text-white h-12">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            {COUNTRIES.map((countryName) => (
              <SelectItem key={countryName} value={countryName} className="text-white">
                {countryName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>
    </div>
  )
}
