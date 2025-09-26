"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { MultiUserOTP } from "@/components/auth/multi-user-otp"

function OTPVerificationContent() {
  const searchParams = useSearchParams()
  const defaultUserType = searchParams.get("userType") === "recruiter" ? "recruiter" : "candidate"
  const email = searchParams.get("email") || ""
  const redirect = searchParams.get("redirect") || "/dashboard"

  return (
    <div className="flex flex-col lg:flex-row min-h-[450px] lg:min-h-[400px]">
      {/* Left Panel */}
      <div className="lg:w-1/2 relative overflow-hidden">
        <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 aspect-[4/3] lg:aspect-[4/5]">
          <Image
            src="/images/student-desk.png"
            alt="Student at desk"
            fill
            className="object-cover object-center translate-x-[5%]"
            priority
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="lg:w-1/2 p-6 lg:p-8 bg-slate-800 flex flex-col justify-center">
        <MultiUserOTP email={email} redirect={redirect} defaultUserType={defaultUserType} />
      </div>
    </div>
  )
}

export default function OTPVerificationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-full">
          <OTPVerificationContent />
        </div>
      </div>
    </Suspense>
  )
}
