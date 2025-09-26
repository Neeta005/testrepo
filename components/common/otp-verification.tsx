"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { OtpInput } from "@/components/ui/otp-input"
import { Card } from "@/components/ui/card"

interface OTPVerificationProps {
  onVerify: (otp: string) => void
  onResend: () => void
  isVerifying?: boolean
  error?: string
  phoneNumber?: string
  email?: string
}

export function OTPVerification({
  onVerify,
  onResend,
  isVerifying = false,
  error,
  phoneNumber,
  email,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState("")
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes
  const [resendTimeLeft, setResendTimeLeft] = useState(60) // 1 minute for resend

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  useEffect(() => {
    if (resendTimeLeft > 0) {
      const timer = setTimeout(() => setResendTimeLeft(resendTimeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify(otp)
    }
  }

  const handleResend = () => {
    onResend()
    setResendTimeLeft(60)
    setTimeLeft(180)
    setOtp("")
  }

  return (
    <Card className="bg-slate-800 border-slate-600 p-8 max-w-md mx-auto">
      <div className="text-center space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">Verify Your Account</h2>
          <p className="text-gray-400">We've sent a 6-digit code to {phoneNumber || email}</p>
        </div>

        <div className="space-y-4">
          <OtpInput value={otp} onChange={setOtp} />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleVerify}
            disabled={otp.length !== 6 || isVerifying}
            className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50"
          >
            {isVerifying ? "Verifying..." : "Verify Code"}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-gray-400 text-sm">
              Code expires in: <span className="text-white font-mono">{formatTime(timeLeft)}</span>
            </p>

            {resendTimeLeft > 0 ? (
              <p className="text-gray-500 text-sm">Resend code in {formatTime(resendTimeLeft)}</p>
            ) : (
              <Button
                variant="ghost"
                onClick={handleResend}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                Resend Code
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
