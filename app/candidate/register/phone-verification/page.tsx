"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RegistrationPageLayout } from "@/components/layout/registration-page-layout"
import { PageLayout } from "@/components/layout/page-layout"
import { PhoneInput } from "@/components/candidate/phone-input"
import { OTPVerification } from "@/components/candidate/otp-verification"
import { useCandidateProgress } from "@/hooks/use-candidate-progress"
import { useCountdownTimer } from "@/hooks/use-countdown-timer"
import { candidateNavigationItems } from "@/lib/data"

export default function PhoneVerificationPage() {
  const router = useRouter()
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [countryCode, setCountryCode] = useState("+1")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentStepCompletion, setCurrentStepCompletion] = useState(0)

  const { updateProgress } = useCandidateProgress()
  const { timer: resendTimer, startTimer } = useCountdownTimer(30)

  const handleSendOTP = async () => {
    if (!phoneNumber.trim()) return
    setIsLoading(true)
    const fullPhoneNumber = `${countryCode}${phoneNumber}`
    console.log("Sending OTP to:", fullPhoneNumber)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setStep("otp")
    startTimer(30)
  }

  const handleOTPComplete = async (otp: string) => {
    if (otp.length === 6) {
      setIsLoading(true)
      // Simulate OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
      updateProgress("phone", true)
      setCurrentStepCompletion(100)
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

  return (
    <PageLayout navigationItems={candidateNavigationItems}>
      <RegistrationPageLayout
        title="OTP Verification"
        nextHref="/candidate/register/basic-info"
        currentStep={2}
        completionPercentage={currentStepCompletion}
        onPrevious={handleBack}
        onNext={step === "phone" ? handleNext : undefined}
        nextButtonText={step === "phone" ? (isLoading ? "Sending..." : "Next") : undefined}
      >
        <div className="rounded-xl p-8 min-h-[450px] w-full max-w-2xl mx-auto space-y-6">
          {step === "phone" ? (
            <PhoneInput
              countryCode={countryCode}
              phoneNumber={phoneNumber}
              onCountryCodeChange={setCountryCode}
              onPhoneNumberChange={setPhoneNumber}
              onSendOTP={handleNext}
              isLoading={isLoading}
            />
          ) : (
            <OTPVerification
              countryCode={countryCode}
              phoneNumber={phoneNumber}
              onOTPComplete={handleOTPComplete}
              onChangeNumber={handleChangeNumber}
              onResendOTP={handleSendOTP}
              resendTimer={resendTimer}
              isLoading={isLoading}
            />
          )}
        </div>
      </RegistrationPageLayout>
    </PageLayout>
  )
}
