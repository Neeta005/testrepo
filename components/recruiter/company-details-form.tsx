"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select" // your custom Select

interface CompanyDetailsFormProps {
  companyName: string
  companySize: string
  aboutUs: string
  onCompanyNameChange: (name: string) => void
  onCompanySizeChange: (size: string) => void
  onAboutUsChange: (aboutUs: string) => void
}

export function CompanyDetailsForm({
  companyName,
  companySize,
  aboutUs,
  onCompanyNameChange,
  onCompanySizeChange,
  onAboutUsChange,
}: CompanyDetailsFormProps) {
  const companySizeOptions = [
    "Software company",
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "500+",
  ]

  return (
    <div className="space-y-6">
      {/* Company Name */}
      <div>
        <label className="block text-white text-sm font-medium mb-3">Company Name</label>
        <div className="relative">
          <Input
            type="text"
            value={companyName}
            onChange={(e) => onCompanyNameChange(e.target.value)}
            className="pr-12"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Company Size */}
      <div>
        <label className="block text-white text-sm font-medium mb-3">Company Size</label>
        <Select value={companySize} onValueChange={onCompanySizeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select company size" />
          </SelectTrigger>
          <SelectContent>
            {companySizeOptions.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* About Us */}
      
    </div>
  )
}
