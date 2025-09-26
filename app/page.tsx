"use client"

import { LoginContainer } from "@/components/auth/login-container"

export default function HomePage() {
  return (
    <LoginContainer
      studentImage="/images/student-desk.png"
      backgroundImage="/images/background-pattern.png"
      logoImage="/images/Logo.png"
    />
  )
}
