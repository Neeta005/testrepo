"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthToggle } from "./auth-toggle"
import { SocialLogin } from "./social-login"

interface RecruiterLoginProps {
  onSubmit?: (data: { email: string; userType: "candidate" | "recruiter" }) => void
  onSocialLogin?: (provider: string) => void
}

export function RecruiterLogin({ onSubmit, onSocialLogin }: RecruiterLoginProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [userType, setUserType] = useState<"candidate" | "recruiter">("recruiter")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("[v0] Login attempt:", { email, userType })

      // Route based on user type
      if (userType === "candidate") {
        router.push(
          `/otp-verification?email=${encodeURIComponent(email)}&userType=${userType}&redirect=/candidate/register`,
        )
      } else {
        router.push(
          `/otp-verification?email=${encodeURIComponent(email)}&userType=${userType}&redirect=/recruiter/register`,
        )
      }

      // Call parent callback if provided
      onSubmit?.({ email, userType })
    } catch (error) {
      console.error("[v0] Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    console.log("[v0] Social login attempt:", { provider, userType })

    if (provider === "linkedin" && userType === "candidate") {
      router.push("/candidate/register")
    } else if (provider === "linkedin" && userType === "recruiter") {
      router.push("/recruiter/register")
    }

    onSocialLogin?.(provider)
  }

  return (
    <div className="w-full max-w-md">
      {/* Title and Toggle in a row */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Sign up</h1>
        <div className="w-1/2">
          <AuthToggle onToggle={setUserType} defaultType="recruiter" />
        </div>
      </div>

      {/* Social login - only LinkedIn */}
      <div className="space-y-3 mb-2">
        <SocialLogin provider="linkedin" onLogin={handleSocialLogin} />
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-slate-800 text-gray-400">Or, login with email</span>
        </div>
      </div>

      {/* Email form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-gray-300 text-sm">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            required
            disabled={isLoading || userType === "candidate"}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading || !email}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-2 px-15 rounded-full disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Get OTP"}
          </Button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        {"Don't have an account? "}
        <a href="#" className="text-blue-400 hover:text-blue-300">
          Sign up
        </a>
      </p>
    </div>
  )
}
