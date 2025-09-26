"use client"

import { Button } from "@/components/ui/button"

interface OTPVerificationSectionProps {
  otp: string[]
  onOtpChange: (index: number, value: string) => void
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
        <div className="flex gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => onOtpChange(index, e.target.value)}
              className="w-12 h-12 border-2 border-white rounded-lg text-white text-center text-lg font-semibold focus:border-red-500 focus:outline-none transition-colors bg-slate-900"
            />
          ))}
        </div>

        <Button
          onClick={onVerify}
          disabled={otp.some((digit) => digit === "")}
          className="bg-gradient-to-r from-pink-500 to-orange-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verify
        </Button>
      </div>
    </div>
  )
}
