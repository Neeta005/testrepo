"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface PhoneInputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  hasError?: boolean
}

export function PhoneInput({
  value = "",
  onChange,
  placeholder = "Enter phone number",
  className,
  hasError = false,
}: PhoneInputProps) {
  const [countryCode, setCountryCode] = useState("+91")
  const [phoneNumber, setPhoneNumber] = useState(value.replace(/^\+\d+\s*/, "") || "")

  const handlePhoneChange = (newPhone: string) => {
    setPhoneNumber(newPhone)
    onChange?.(countryCode + " " + newPhone)
  }

  const handleCountryChange = (newCountryCode: string) => {
    setCountryCode(newCountryCode)
    onChange?.(newCountryCode + " " + phoneNumber)
  }

  return (
    <div className="flex gap-2">
      {/* Country Code Dropdown */}
      <div className="relative">
        <select
          value={countryCode}
          onChange={(e) => handleCountryChange(e.target.value)}
          className={cn(
            "appearance-none bg-slate-800 border rounded-lg px-4 py-3 pr-8 text-white focus:outline-none focus:ring-2 min-w-[100px] h-12",
            hasError ? "border-red-500 focus:ring-red-500" : "border-white focus:ring-blue-500 focus:border-blue-500",
          )}
        >
          <option value="+91">🇮🇳 +91</option>
          <option value="+1">🇺🇸 +1</option>
          <option value="+44">🇬🇧 +44</option>
          <option value="+86">🇨🇳 +86</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Phone Number Input */}
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => handlePhoneChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "flex-1 bg-slate-800 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 h-12",
          hasError ? "border-red-500 focus:ring-red-500" : "border-white focus:ring-blue-500 focus:border-blue-500",
          className,
        )}
      />
    </div>
  )
}
