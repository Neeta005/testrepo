"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthToggle } from "./auth-toggle"
import { SocialLogin } from "./social-login"

interface AuthFormProps {
  title: string
  type: "signup" | "login"
  onSubmit: (data: { email: string; userType: "candidate" | "recruiter" }) => void
  onSocialLogin: (provider: string) => void
}

export function AuthForm({ title, type, onSubmit, onSocialLogin }: AuthFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [userType, setUserType] = useState<"candidate" | "recruiter">("candidate")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (userType === "candidate") {
      router.push(
        `/otp-verification?email=${encodeURIComponent(email)}&userType=${userType}&redirect=/candidate/register`,
      )
    } else {
      router.push(
        `/otp-verification?email=${encodeURIComponent(email)}&userType=${userType}&redirect=/recruiter/register`,
      )
    }
    onSubmit({ email, userType })
  }

  const handleSocialLogin = (provider: string) => {
    if (provider === "linkedin" && userType === "candidate") {
      router.push("/candidate/register")
    } else if (provider === "linkedin" && userType === "recruiter") {
      router.push("/recruiter/register")
    }
    onSocialLogin(provider)
  }

  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-bold text-white mb-6">{title}</h1>

      <AuthToggle onToggle={setUserType} defaultType="candidate" />

      <SocialLogin provider="linkedin" onLogin={handleSocialLogin} />

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-slate-800 text-gray-400">Or, login with email</span>
        </div>
      </div>

   <form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <Label htmlFor="email" className="text-gray-300 text-sm">
      Email
    </Label>
    <Input
      id="email"
      type="email"
      placeholder="you@company.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="mt-1 bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
      required
    />
  </div>

  {/* Wrap button in a flex container to align right */}
 <div className="flex justify-end">
  <Button
    type="submit"
    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-2 px-15 rounded-full"
  >
    Get OTP
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
