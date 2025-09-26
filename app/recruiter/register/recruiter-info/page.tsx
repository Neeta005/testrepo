"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { RegistrationPageLayout } from "@/components/layout/registration-page-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { recruiterNavigationItems } from "@/lib/data"
import { setRecruiterStepComplete, calcRecruiterProgressPercent } from "@/lib/progress"

export default function RecruiterInfoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
  })
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isVerified, setIsVerified] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleRequestOTP = () => {
    if (formData.mobile.length === 10) {
      setOtpSent(true)
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleVerify = () => {
    if (otp.every((digit) => digit !== "")) {
      setIsVerified(true)
      handleFinishRegistration() // Show Thank You modal
    }
  }

  const handleFinishRegistration = () => {
    setShowSuccessModal(true)
  }

  const handleGoToDashboard = () => {
    router.push("/recruiter/dashboard")
  }

  const handleReview = () => {
    router.push("/recruiter/register")
  }

  // Only show 25% for this step when all required fields are filled, and update shared progress
  const requiredFields: (keyof typeof formData)[] = ["fullName", "email", "mobile"]
  const allFilled = requiredFields.every((key) => {
    const v = formData[key]
    if (typeof v === "string") return v.trim().length > 0
    return !!v
  })
  if (typeof window !== "undefined") {
    setRecruiterStepComplete("recruiterInfo", allFilled)
  }
  const percent = typeof window !== "undefined" ? calcRecruiterProgressPercent() : 0

  // Common input class for dark theme
  const inputClasses =
    "bg-slate-900 border border-white text-white placeholder:text-gray-400 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-red-500 focus:ring-0 w-full transition-colors"

  return (
    <PageLayout navigationItems={recruiterNavigationItems}>
      <RegistrationPageLayout
        title="Register"
        nextHref="/recruiter/register/review"
        currentStep={4}
        nextButtonText="Next"
        completionPercentage={percent}
      >
        <p className="text-md text-gray-400 mb-6">Recruiter Details</p>

        <div className="space-y-6">
          {/* Full Name + Email Row */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Full Name */}
            <div className="flex-1">
              <label className="block text-white text-sm font-medium mb-3">Full Name</label>
              <input
                placeholder="Text field"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={inputClasses}
              />
            </div>

            {/* Email */}
            <div className="flex-1">
              <label className="block text-white text-sm font-medium mb-3">Email Id</label>
              <input
                type="email"
                placeholder="ex@ex.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClasses}
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">Mobile Number</label>
            <div className="flex gap-2 items-center">
              <input
                placeholder="+91  Enter your 10-digit number"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })
                }
                className={`${inputClasses} flex-1`}
              />
              {formData.mobile.length === 10 && (
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Request OTP Button */}
          <Button
            onClick={handleRequestOTP}
            disabled={formData.mobile.length !== 10}
            className="bg-gradient-to-r from-pink-500 to-orange-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold disabled:cursor-not-allowed"
          >
            Request OTP
          </Button>

          {/* OTP Section */}
          {otpSent && (
            <div className="space-y-4">
              <div className="text-gray-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">OTP received</span>
                </div>
                <p className="text-xs text-gray-400">Enter the 6-digit code sent to your mobile</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-12 border-2 border-white rounded-lg text-white text-center text-lg font-semibold focus:border-red-500 focus:outline-none transition-colors bg-slate-900"
                    />
                  ))}
                </div>

                <Button
                  onClick={handleVerify}
                  disabled={otp.some((digit) => digit === "")}
                  className="bg-gradient-to-r from-pink-500 to-orange-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-white/50 flex items-center justify-center z-50">
            <div className="rounded-2xl p-8 max-w-md w-full mx-4 text-center bg-black shadow-lg">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">Thank You</h2>
              <p className="text-gray-400 mb-8">Your Registration is Successfully completed</p>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={handleReview}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-2 bg-transparent"
                >
                  Review
                </Button>
                <Button
                  onClick={handleGoToDashboard}
                  className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-2"
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </div>
        )}
      </RegistrationPageLayout>
    </PageLayout>
  )
}
