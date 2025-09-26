"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { RegistrationPageLayout } from "@/components/layout/registration-page-layout"
import { ContactForm } from "@/components/recruiter/contact-form"
import { OTPVerificationSection } from "@/components/recruiter/otp-verification-section"
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
      handleFinishRegistration()
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

  // Progress calculation
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

  return (
    <PageLayout navigationItems={recruiterNavigationItems}>
      <RegistrationPageLayout title="Register" currentStep={4} nextButtonText="Finish" completionPercentage={percent}>
        <p className="text-md text-gray-400 mb-6">Recruiter Details</p>

        <div className="space-y-6">
          <ContactForm
            fullName={formData.fullName}
            email={formData.email}
            mobile={formData.mobile}
            onFullNameChange={(name) => setFormData({ ...formData, fullName: name })}
            onEmailChange={(email) => setFormData({ ...formData, email })}
            onMobileChange={(mobile) => setFormData({ ...formData, mobile })}
          />

          {/* Request OTP Button */}
          <Button
            onClick={handleRequestOTP}
            disabled={formData.mobile.length !== 10}
            className="bg-gradient-to-r from-pink-500 to-orange-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold disabled:cursor-not-allowed"
          >
            Request OTP
          </Button>

          <OTPVerificationSection otp={otp} onOtpChange={handleOtpChange} onVerify={handleVerify} isVisible={otpSent} />
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
                  Review and Finish
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
