"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { RegistrationPageLayout } from "@/components/layout/registration-page-layout"
import { OTPInput } from "@/components/ui/otp-input"
import { Button } from "@/components/ui/button"
import { candidateNavigationItems } from "@/lib/data"

export default function OTPVerificationPage() {
  const router = useRouter()
  const [otp, setOtp] = useState("")
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes in seconds
  const [resendTimeLeft, setResendTimeLeft] = useState(60) // 1 minute for resend

  const handleOTPComplete = (otpValue: string) => {
    setOtp(otpValue)
  }

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      // Simulate OTP verification
      router.push("/candidate/register/basic-info")
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <PageLayout navigationItems={candidateNavigationItems}>
      <RegistrationPageLayout
        title="OTP Verification"
        nextHref="/candidate/register/basic-info"
        currentStep={2}
        completionPercentage={50}
      >
        <div className="space-y-2">
          <p className="text-gray-300">{"We've sent a 6-digit code to +914321234 Please enter it below"}</p>
          <p className="text-gray-300">
            to verify your identity <button className="text-red-400 hover:text-red-300 underline">Change Number</button>
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-white">OTP</label>
              <span className="text-sm text-gray-400">Valid for {formatTime(timeLeft)}</span>
            </div>
            <OTPInput length={6} onComplete={handleOTPComplete} />
          </div>

          <div className="text-sm text-gray-400">
            {"Didn't Received? "}
            <button className="text-red-400 hover:text-red-300">Resend Code in {formatTime(resendTimeLeft)}</button>
          </div>

          <Button
            onClick={handleVerifyOTP}
            className="w-full px-6 bg-gradient-to-r from-pink-500 to-orange-500 hover:bg-red-600 py-3 rounded-lg font-medium"
            disabled={otp.length !== 6}
          >
            Verify OTP
          </Button>
        </div>
      </RegistrationPageLayout>
    </PageLayout>
  )
}
