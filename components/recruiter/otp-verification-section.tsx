"use client"

import { Button } from "@/components/ui/button"
import { OTPInput } from "@/components/ui/otp-input"

interface OTPVerificationSectionProps {
  otp: string
  onOtpChange: (otp: string) => void
  onVerify: () => void
  isVisible: boolean
}

export function OTPVerificationSection({ otp, onOtpChange, onVerify, isVisible }: OTPVerificationSectionProps) {
  if (!isVisible) return null

  return (
    <div className="space-y-4">
      <div className="text-gray-300">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">OTP received</span>
        </div>
        <p className="text-xs text-gray-400">Enter the 6-digit code sent to your mobile</p>
      </div>

      <div className="flex items-center gap-4">
        <OTPInput
          length={6}
          onComplete={onOtpChange}
        />

        <Button
          onClick={onVerify}
          disabled={otp.length !== 6}
          className="bg-gradient-to-r from-pink-500 to-orange-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verify
        </Button>
      </div>
    </div>
  )
}
