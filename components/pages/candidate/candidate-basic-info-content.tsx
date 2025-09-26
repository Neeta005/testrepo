"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CandidateBasicInfoContentProps {
  onCompletionChange: (completion: number) => void
  onComplete?: () => void
}

interface BasicInfoData {
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  gender: string
  address: string
  city: string
  state: string
  zipCode: string
  linkedinUrl: string
  portfolioUrl: string
}

export function CandidateBasicInfoContent({ 
  onCompletionChange, 
  onComplete 
}: CandidateBasicInfoContentProps) {
  const [formData, setFormData] = useState<BasicInfoData>({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    linkedinUrl: "",
    portfolioUrl: ""
  })

  // Required fields for completion
  const requiredFields = [
    'firstName', 'lastName', 'email', 'dateOfBirth', 'gender', 
    'address', 'city', 'state', 'zipCode'
  ]

  // Calculate completion percentage based only on basic info (up to 75%)
  useEffect(() => {
    const filledRequiredFields = requiredFields.filter(field => 
      formData[field as keyof BasicInfoData]?.trim() !== ""
    ).length
    
    const totalCompletion = Math.round((filledRequiredFields / requiredFields.length) * 75)
    onCompletionChange(totalCompletion)

    if (totalCompletion === 75 && onComplete) {
      onComplete()
    }
  }, [formData, onCompletionChange, onComplete])

  const handleInputChange = (field: keyof BasicInfoData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="rounded-xl p-8 min-h-[450px] w-full max-w-4xl mx-auto space-y-8">
      <div className="text-left space-y-2">
        <h2 className="text-2xl font-semibold text-white">Personal Information</h2>
        <p className="text-gray-300">
          Please fill in your basic information to complete your profile
        </p>
      </div>

      {/* Basic Information Form */}
      <div className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-white">
              First Name *
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="bg-slate-800 border border-slate-600 text-white placeholder:text-gray-400 rounded-md"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-white">
              Last Name *
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="bg-slate-800 border border-slate-600 text-white placeholder:text-gray-400 rounded-md"
              required
            />
          </div>
        </div>

        {/* Email and DOB */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-slate-800 border border-slate-600 text-white placeholder:text-gray-400 rounded-md"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-white">
              Date of Birth *
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="bg-slate-800 border border-slate-600 text-white placeholder:text-gray-400 rounded-md"
              required
            />
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-white">
            Gender *
          </Label>
          <select
            id="gender"
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full bg-slate-800 border border-slate-600 text-white rounded-md px-4 py-3 pr-8 appearance-none"
            required
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-white">
            Address *
          </Label>
          <Input
            id="address"
            type="text"
            placeholder="Enter your full address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="bg-slate-800 border border-slate-600 text-white placeholder:text-gray-400 rounded-md"
            required
          />
        </div>

        {/* City, State, ZIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-white">
              City *
            </Label>
            <Input
              id="city"
              type="text"
              placeholder="Enter your city"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="bg-slate-800 border border-slate-600 text-white placeholder:text-gray-400 rounded-md"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state" className="text-white">
              State *
            </Label>
            <Input
              id="state"
              type="text"
              placeholder="Enter your state"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="bg-slate-800 border border-slate-600 text-white placeholder:text-gray-400 rounded-md"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode" className="text-white">
              ZIP Code *
            </Label>
            <Input
              id="zipCode"
              type="text"
              placeholder="Enter ZIP code"
              value={formData.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              className="bg-slate-800 border border-slate-600 text-white placeholder:text-gray-400 rounded-md"
              required
            />
          </div>
        </div>

        {/* Optional URLs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="linkedinUrl" className="text-white">
              LinkedIn Profile (Optional)
            </Label>
            <Input
              id="linkedinUrl"
              type="url"
              placeholder="https://linkedin.com/in/yourprofile"
              value={formData.linkedinUrl}
              onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
              className="bg-slate-800 border border-slate-600 text-white placeholder:text-gray-400 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="portfolioUrl" className="text-white">
              Portfolio URL (Optional)
            </Label>
            <Input
              id="portfolioUrl"
              type="url"
              placeholder="https://yourportfolio.com"
              value={formData.portfolioUrl}
              onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
              className="bg-slate-800 border border-slate-600 text-white placeholder:text-gray-400 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
