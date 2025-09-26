"use client"

import { OTPInput } from "@/components/ui/otp-input"

interface OTPVerificationProps {
  countryCode: string
  phoneNumber: string
  onOTPComplete: (otp: string) => void
  onChangeNumber: () => void
  onResendOTP: () => void
  resendTimer: number
  isLoading: boolean
}

export function OTPVerification({
  countryCode,
  phoneNumber,
  onOTPComplete,
  onChangeNumber,
  onResendOTP,
  resendTimer,
  isLoading,
}: OTPVerificationProps) {
  return (
    <>
      <div className="text-left space-y-2">
        <p className="text-gray-300">
          We sent a 6-digit code to{" "}
          <span className="text-pink-400">
            {countryCode} {phoneNumber}
          </span>
          . Please enter it below to verify your identity.
        </p>
        <button onClick={onChangeNumber} className="text-pink-400 underline text-sm mt-1">
          Change Number
        </button>
      </div>

      <div className="flex flex-col items-start gap-4 mt-2">
        <OTPInput length={6} onComplete={onOTPComplete} className="flex space-x-2" />
        <button
          onClick={onResendOTP}
          className="text-pink-400 underline text-sm mt-2"
          disabled={resendTimer > 0 || isLoading}
        >
          Resend Code {resendTimer > 0 && `in ${resendTimer}s`}
        </button>
      </div>
    </>
  )
}
