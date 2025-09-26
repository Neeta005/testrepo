"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { OTPInput } from "@/components/ui/otp-input"
import { RegistrationPageLayout } from "@/components/layout/registration-page-layout"
import { PageLayout } from "@/components/layout/page-layout"
import { candidateNavigationItems } from "@/lib/data"

export default function PhoneVerificationPage() {
  const router = useRouter()
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [countryCode, setCountryCode] = useState("+1")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const [currentStepCompletion, setCurrentStepCompletion] = useState(0) // New state for current step completion

  const [overallProgress, setOverallProgress] = useState<{
    resume: boolean
    phone: boolean
    personal: boolean
    education: boolean
  }>({
    resume: false,
    phone: false,
    personal: false,
    education: false,
  })

  useEffect(() => {
    const storedProgress = localStorage.getItem("candidateRegistrationProgress")
    if (storedProgress) {
      setOverallProgress(JSON.parse(storedProgress))
    }
  }, [])

  // Start countdown for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (step === "otp" && resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [resendTimer, step])

  const handleSendOTP = async () => {
    if (!phoneNumber.trim()) return
    setIsLoading(true)
    const fullPhoneNumber = `${countryCode}${phoneNumber}`
    console.log("Sending OTP to:", fullPhoneNumber)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setStep("otp")
    setResendTimer(30)
  }

  const handleOTPComplete = async (otp: string) => {
    if (otp.length === 6) {
      setIsLoading(true)
      // Simulate OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
      const updatedProgress = { ...overallProgress, phone: true }
      localStorage.setItem("candidateRegistrationProgress", JSON.stringify(updatedProgress))
      setOverallProgress(updatedProgress)
      setCurrentStepCompletion(100) // Mark current step as 100% complete
      router.push("/candidate/register/basic-info")
    }
  }

  const handleBack = () => {
    if (step === "otp") {
      setStep("phone")
    } else {
      router.push("/candidate/register")
    }
  }

  const handleNext = () => {
    if (step === "phone") {
      handleSendOTP()
    }
  }

  const handleChangeNumber = () => {
    setStep("phone")
    setPhoneNumber("")
  }

  // The completionPercentage prop in RegistrationPageLayout expects the completion of the current step (0-100)

  return (
    <PageLayout navigationItems={candidateNavigationItems}>
      <RegistrationPageLayout
        title="OTP Verification"
        nextHref="/candidate/register/basic-info"
        currentStep={2}
        completionPercentage={currentStepCompletion} // Pass currentStepCompletion (0-100)
        onPrevious={handleBack}
        onNext={step === "phone" ? handleNext : undefined}
        nextButtonText={step === "phone" ? (isLoading ? "Sending..." : "Next") : undefined}
      >
        <div className="rounded-xl p-8 min-h-[450px] w-full max-w-2xl mx-auto space-y-6">
          {step === "phone" ? (
            <>
              <div className="text-left space-y-2">
                <h2 className="text-2xl font-semibold text-white">Verify Your Phone Number</h2>
                <p className="text-gray-300">We\'ll send you a verification code to confirm your phone number</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Phone Number
                  </Label>

                  {/* Country code + phone number */}
                  <div className="flex space-x-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-slate-700 border border-slate-600 text-white px-3 rounded-md focus:outline-none"
                    >
                      <option value="+1">+1 (US)</option>
                      <option value="+91">+91 (IN)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+61">+61 (AU)</option>
                      {/* Add more country codes as needed */}
                    </select>

                    <Input
                      id="phone"
                      type="tel"
                      placeholder="123-456-7890"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-slate-800 border border-slate-600 text-white placeholder:text-gray-400 rounded-md flex-1"
                    />
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className=" mt-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold px-8 py-2 rounded-md shadow-md hover:opacity-90 transition disabled:opacity-60"
                  disabled={!phoneNumber.trim() || isLoading}
                >
                  {isLoading ? "Sending..." : "Request OTP"}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-left space-y-2">
                <p className="text-gray-300">
                  We sent a 6-digit code to{" "}
                  <span className="text-pink-400 ">
                    {countryCode} {phoneNumber}
                  </span>
                  . Please enter it below to verify your identity.
                </p>
                <button onClick={handleChangeNumber} className="text-pink-400 underline text-sm mt-1">
                  Change Number
                </button>
              </div>

              <div className="flex flex-col items-start gap-4 mt-2">
                <OTPInput length={6} onComplete={handleOTPComplete} className="flex space-x-2" />
                <button
                  onClick={handleSendOTP}
                  className="text-pink-400  underline text-sm mt-2 "
                  disabled={resendTimer > 0 || isLoading}
                >
                  Resend Code {resendTimer > 0 && `in ${resendTimer}s`}
                </button>
              </div>
            </>
          )}
        </div>
      </RegistrationPageLayout>
    </PageLayout>
  )
}
