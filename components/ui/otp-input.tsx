"use client"

import type React from "react"
import { useState, useRef, type KeyboardEvent } from "react"

interface OTPInputProps {
  length?: number
  onComplete: (otp: string) => void
  className?: string
}

export function OTPInput({ length = 6, onComplete, className = "" }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (element: HTMLInputElement, index: number) => {
    const val = element.value

    if (val.length > 1) return

    if (val !== "" && isNaN(Number(val))) return

    const newOtp = [...otp]
    newOtp[index] = val
    setOtp(newOtp)

    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""))
    } else {
      onComplete("") // This resets otp in parent to empty string if incomplete
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp]
        newOtp[index] = ""
        setOtp(newOtp)
        onComplete("")
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData("Text").slice(0, length)
    if (!/^\d+$/.test(pasteData)) return

    const pasteDigits = pasteData.split("")
    const newOtp = [...otp]
    for (let i = 0; i < length; i++) {
      newOtp[i] = pasteDigits[i] || ""
    }
    setOtp(newOtp)
    onComplete(newOtp.join(""))

    const nextIndex = pasteDigits.length < length ? pasteDigits.length : length - 1
    inputRefs.current[nextIndex]?.focus()
  }

  return (
    <div className={`flex gap-3 justify-center ${className}`}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-lg font-semibold bg-slate-700 border border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500 rounded"
          autoComplete="one-time-code"
          spellCheck={false}
        />
      ))}
    </div>
  )
}

export { OTPInput as OtpInput }
