"use client"

import { AuthLayout } from "./auth-layout"
import { RecruiterLogin } from "./recruiter-login"

interface LoginContainerProps {
  studentImage?: string
  backgroundImage?: string
  logoImage?: string
  logoText?: string
}

export function LoginContainer({
  studentImage = "/images/student-desk.png",
  backgroundImage = "/images/background-pattern.png",
  logoImage = "/images/Logo.png",
  logoText = "WORLD OF INTERNS",
}: LoginContainerProps) {
  const handleLoginSubmit = (data: { email: string; userType: "candidate" | "recruiter" }) => {
    console.log("[v0] Login data processed:", data)
    // Additional login logic can be added here
  }

  const handleSocialLogin = (provider: string) => {
    console.log("[v0] Social login processed:", provider)
    // Additional social login logic can be added here
  }

  return (
    <AuthLayout studentImage={studentImage} backgroundImage={backgroundImage} logoImage={logoImage} logoText={logoText}>
      <RecruiterLogin onSubmit={handleLoginSubmit} onSocialLogin={handleSocialLogin} />
    </AuthLayout>
  )
}
