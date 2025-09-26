"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProgressCircle } from "@/components/ui/progress-circle"
import { StepIndicator } from "@/components/ui/step-indicator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { recruiterRegistrationSteps } from "@/lib/data"
import { calcFieldsCompletion } from "@/lib/progress"

export function RecruiterRegisterContent() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: "",
    companySize: "",
    aboutUs: "",
  })

  const handleNext = () => {
    router.push("/recruiter/register/company-details")
  }

  const percent = calcFieldsCompletion(formData)

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Register</h1>
        <Button onClick={handleNext} className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg">
          Next
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Navigation Arrow */}
        <div className="hidden lg:flex items-center justify-center">
          <button className="w-12 h-12 rounded-full border-2 border-red-500 flex items-center justify-center hover:bg-red-500/10 transition-colors">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">Company Details</h2>

          <div className="space-y-6">
            {/* Company Name */}
            <div>
              <label className="block text-white text-sm font-medium mb-3">Company Name</label>
              <div className="relative">
                <Input
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="bg-slate-800 border-red-500 text-white pr-10"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Company Size */}
            <div>
              <label className="block text-white text-sm font-medium mb-3">Company Size</label>
              <div className="relative">
                <select
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className="w-full bg-slate-800 border border-red-500 text-white rounded-lg px-4 py-3 pr-8 appearance-none"
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* About Us */}
            <div>
              <label className="block text-white text-sm font-medium mb-3">About Us</label>
              <RichTextEditor
                value={formData.aboutUs}
                onChange={(value) => setFormData({ ...formData, aboutUs: value })}
                placeholder="Tell us about your company..."
              />
            </div>
          </div>
        </div>

        {/* Right Side - Progress and Steps */}
        <div className="flex flex-col items-center space-y-6">
          {/* Right Navigation Arrow */}
          <div className="hidden lg:flex justify-end w-full">
            <button className="w-12 h-12 rounded-full border-2 border-red-500 flex items-center justify-center hover:bg-red-500/10 transition-colors">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Progress Circle */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 w-full max-w-sm">
            <div className="flex justify-center mb-6">
              <ProgressCircle percentage={percent} />
            </div>

            <StepIndicator steps={recruiterRegistrationSteps} currentStep={1} className="space-y-4" />
          </div>
        </div>
      </div>
    </div>
  )
}
