"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
  return (
    <>
      <div className="text-left space-y-2">
        <h2 className="text-2xl font-semibold text-white">Verify Your Phone Number</h2>
        <p className="text-gray-300">We'll send you a verification code to confirm your phone number</p>
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
              onChange={(e) => onCountryCodeChange(e.target.value)}
              className="bg-slate-700 border border-slate-600 text-white px-3 rounded-md focus:outline-none"
            >
              <option value="+1">+1 (US)</option>
              <option value="+91">+91 (IN)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+61">+61 (AU)</option>
            </select>

            <Input
              id="phone"
              type="tel"
              placeholder="123-456-7890"
              value={phoneNumber}
              onChange={(e) => onPhoneNumberChange(e.target.value)}
              className="bg-slate-800 border border-slate-600 text-white placeholder:text-gray-400 rounded-md flex-1"
            />
          </div>
        </div>

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
