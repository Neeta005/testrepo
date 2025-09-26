"use client"

import { useState, useEffect, forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { CalendarIcon } from "lucide-react"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

interface CandidateBasicInfoContentProps {
  onCompletionChange: (completion: number) => void
  onComplete?: () => void
}

interface BasicInfoData {
  firstName: string
  lastName: string
  email: string
  dateOfBirth: Date | null
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
  onComplete,
}: CandidateBasicInfoContentProps) {
  const [formData, setFormData] = useState<BasicInfoData>({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: null,
    gender: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    linkedinUrl: "",
    portfolioUrl: "",
  })

  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "dateOfBirth",
    "gender",
    "address",
    "city",
    "state",
    "zipCode",
  ]

  useEffect(() => {
    const filledRequiredFields = requiredFields.filter((field) => {
      const value = formData[field as keyof BasicInfoData]
      return value !== null && value !== ""
    }).length

    const totalCompletion = Math.round(
      (filledRequiredFields / requiredFields.length) * 75
    )
    onCompletionChange(totalCompletion)

    if (totalCompletion === 75 && onComplete) onComplete()
  }, [formData, onCompletionChange, onComplete])

  const handleInputChange = (field: keyof BasicInfoData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Custom Date Input using your Input component
  const CustomDateInput = forwardRef<HTMLInputElement, any>(
    ({ value, onClick }, ref) => (
      <div className="relative w-full">
        <Input
          onClick={onClick}
          ref={ref}
          value={value}
          placeholder="Select your date of birth"
          readOnly
          className="pr-10" // space for the calendar icon
        />
        <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    )
  )
  CustomDateInput.displayName = "CustomDateInput"

  return (
    <div className="rounded-xl p-8 min-h-[450px] w-full max-w-4xl mx-auto space-y-8">
      <div className="text-left space-y-2">
        <h2 className="text-2xl font-semibold text-white">Personal Information</h2>
        <p className="text-gray-300">
          Please fill in your basic information to complete your profile
        </p>
      </div>

      <div className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-white">First Name *</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-white">Last Name *</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email and DOB */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-white">Date of Birth *</Label>
            <DatePicker
              selected={formData.dateOfBirth}
              onChange={(date) => handleInputChange("dateOfBirth", date)}
              customInput={<CustomDateInput />}
              calendarClassName="bg-slate-900 text-white rounded-md"
              dateFormat="dd/MM/yyyy"
              wrapperClassName="w-full"
            />
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-white">Gender *</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) => handleInputChange("gender", value)}
          >
            <SelectTrigger className="w-full ">
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent className="w-full bg-slate-800 text-white rounded-md">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-white">Address *</Label>
          <Input
            id="address"
            type="text"
            placeholder="Enter your full address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            required
          />
        </div>

        {/* City, State, ZIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-white">City *</Label>
            <Input
              id="city"
              type="text"
              placeholder="Enter your city"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state" className="text-white">State *</Label>
            <Input
              id="state"
              type="text"
              placeholder="Enter your state"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode" className="text-white">ZIP Code *</Label>
            <Input
              id="zipCode"
              type="text"
              placeholder="Enter ZIP code"
              value={formData.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              required
            />
          </div>
        </div>
      </div>
    </div>
  )
}
