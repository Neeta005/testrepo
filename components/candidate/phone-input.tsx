"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select" // Radix Select wrapper

interface PhoneInputProps {
  countryCode: string
  phoneNumber: string
  onCountryCodeChange: (code: string) => void
  onPhoneNumberChange: (number: string) => void
  onSendOTP: () => void
  isLoading: boolean
}

export function PhoneInput({
  countryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneNumberChange,
  onSendOTP,
  isLoading,
}: PhoneInputProps) {
  const countries = [
    { code: "+1", label: "US" },
    { code: "+91", label: "IN" },
    { code: "+44", label: "UK" },
    { code: "+61", label: "AU" },
  ]

  return (
    <>
      {/* Header */}
      <div className="text-left space-y-2">
        <h2 className="text-2xl font-semibold text-white">Verify Your Phone Number</h2>
        <p className="text-gray-300">
          We'll send you a verification code to confirm your phone number
        </p>
      </div>

      {/* Input section */}
      <div className="space-y-4">
        <Label htmlFor="phone" className="text-white">
          Phone Number
        </Label>

        <div className="flex space-x-2">
          {/* Country Code Select */}
          <Select value={countryCode} onValueChange={onCountryCodeChange}>
            <SelectTrigger className="w-28 h-12 text-white bg-slate-800 border rounded-lg px-3">
              <SelectValue placeholder="Code" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.code} ({c.label})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Phone Number Input */}
          <Input
            id="phone"
            type="tel"
            placeholder="123-456-7890"
            value={phoneNumber}
            onChange={(e) => onPhoneNumberChange(e.target.value)}
            className="flex-1 "
          />
        </div>

        {/* Request OTP Button */}
        <button
          onClick={onSendOTP}
          className="mt-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold px-8 py-2 rounded-md shadow-md hover:opacity-90 transition disabled:opacity-60"
          disabled={!phoneNumber.trim() || isLoading}
        >
          {isLoading ? "Sending..." : "Request OTP"}
        </button>
      </div>
    </>
  )
}
