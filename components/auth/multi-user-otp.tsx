"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { OTPInput } from "@/components/ui/otp-input"
import { Button } from "@/components/ui/button"
import { AuthToggle } from "@/components/auth/auth-toggle"
import { SocialLogin } from "@/components/auth/social-login"

interface MultiUserOTPProps {
  email: string
  redirect: string
  defaultUserType: "candidate" | "recruiter"
}

export function MultiUserOTP({ email, redirect, defaultUserType }: MultiUserOTPProps) {
  const router = useRouter()
  const [userType, setUserType] = useState<"candidate" | "recruiter">(defaultUserType)
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleOTPComplete = (otpValue: string) => setOtp(otpValue)

  const handleVerifyOTP = () => {
    if (otp.length !== 6) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push(redirect)
    }, 1000)
  }

  const handleResendOTP = () => console.log("Resending OTP to:", email)

  const handleSocialLogin = (provider: string) => {
    console.log("Social login:", provider, userType)
    if (provider === "linkedin") {
      router.push(userType === "candidate" ? "/candidate/register" : "/recruiter/register")
    }
  }

  return (
    <>
      {/* Heading + Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">Sign Up</h1>
        <div className="w-1/2">
          <AuthToggle onToggle={setUserType} defaultType={defaultUserType} />
        </div>
      </div>

      {/* Conditionally render content based on toggle */}
      {userType === "recruiter" ? (
        <>
          {/* LinkedIn button */}
          <div className="mb-4">
            <SocialLogin provider="linkedin" onLogin={handleSocialLogin} />
          </div>

          {/* Divider */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-gray-400">Enter OTP</span>
            </div>
          </div>

          {/* OTP Section */}
          <div className="space-y-4">
            <p className="text-gray-400 text-center">
              We've sent a 6-digit code to <span className="text-white">{email}</span>
            </p>
            <OTPInput onComplete={handleOTPComplete} length={6} className="justify-center" />

            <Button
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6 || isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 rounded-full disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>

            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Didn't receive the code?</p>
              <button onClick={handleResendOTP} className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                Resend Code
              </button>
            </div>
          </div>
        </>
      ) : (
        // Candidate view placeholder
        <div className="text-center text-gray-400 mt-10">
          <p className="text-lg font-medium text-white mb-2">Candidate Login Info</p>
          <p>Enter your email and password on the main login page.</p>
        </div>
      )}
    </>
  )
}
