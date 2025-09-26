"use client"

import Image from "next/image"
import { ProgressCircle } from "@/components/ui/progress-circle"
import { StepIndicator } from "@/components/ui/step-indicator"
import { Button } from "@/components/ui/button"
import { registrationSteps, recruiterRegistrationSteps } from "@/lib/data"
import Link from "next/link"
import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

interface RegistrationPageLayoutProps {
  title: string
  nextHref?: string // Made nextHref optional
  currentStep: number
  children: ReactNode
  onPrevious?: () => void
  onNext?: () => void
  nextButtonText?: string
  onNextClick?: () => void
  completionPercentage?: number
}

export function RegistrationPageLayout({
  title,
  nextHref,
  currentStep,
  children,
  onPrevious,
  onNext,
  nextButtonText = "Next",
  onNextClick,
  completionPercentage,
}: RegistrationPageLayoutProps) {
  const pathname = usePathname()

  const isRecruiterFlow = pathname.includes("/recruiter/")
  const stepsToUse = isRecruiterFlow ? recruiterRegistrationSteps : registrationSteps

  // ==========================
  // Progress Calculation (Whole Numbers)
  // ==========================
  let progressPercentage = 0
  const stepPercent = 100 / stepsToUse.length

  if (typeof completionPercentage === "number") {
    // Steps before current are 100% complete
    const beforeCurrent = (currentStep - 1) * stepPercent

    // Current step partial completion
    const currentStepProgress = Math.min(Math.max(completionPercentage, 0), 100) * (stepPercent / 100)

    // Total progress
    progressPercentage = beforeCurrent + currentStepProgress
  } else {
    // If no partial percentage, use step count
    progressPercentage = currentStep * stepPercent
  }

  // Round to nearest whole number
  progressPercentage = Math.round(progressPercentage)

  // Steps with completed info
  const currentSteps = stepsToUse.map((step, index) => ({
    ...step,
    completed: index < currentStep || (index === currentStep && progressPercentage === 100),
  }))

  return (
    <div className="max-w-7xl mx-2 px-4 lg:px-8">
      <div className="relative mb-10">
        {/* Title aligned to the left */}
        <h1 className="text-3xl font-semibold text-white ml-30">{title}</h1>

        {/* Centered Next button */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          {onNextClick ? (
            <Button
              onClick={onNextClick}
              className="pointer-events-auto bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold px-8 py-2 rounded-md shadow-md hover:opacity-90 transform translate-x-40"
            >
              {nextButtonText}
            </Button>
          ) : nextHref ? ( // Only render Link if nextHref is provided
            <Link href={nextHref}>
              <Button className="pointer-events-auto bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold px-8 py-2 rounded-md shadow-md hover:opacity-90 transform translate-x-30">
                {nextButtonText}
              </Button>
            </Link>
          ) : null}
        </div>
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden lg:grid grid-cols-[50px_1fr_50px_280px] gap-x-8 items-start">
        {/* Left Arrow */}
        <div className="flex justify-start mt-50">
          {onPrevious ? (
            <button className="p-2 hover:bg-red-500/10 transition-colors" aria-label="Previous" onClick={onPrevious}>
              <Image src="/images/arrowleft.png" alt="Left Arrow" width={50} height={50} priority />
            </button>
          ) : (
            <Link
              href={pathname.split("/").slice(0, -1).join("/")}
              className="p-2 hover:bg-red-500/10 transition-colors"
            >
              <Image src="/images/arrowleft.png" alt="Left Arrow" width={50} height={50} priority />
            </Link>
          )}
        </div>

        {/* Main content */}
        <div className="rounded-xl w-full min-h-[500px] max-w-5xl">{children}</div>

        {/* Right Arrow */}
        <div className="flex justify-start mt-50">
          {onNext ? (
            <button className="p-2 hover:bg-red-500/10 transition-colors" aria-label="Next" onClick={onNext}>
              <Image src="/images/arrowright.png" alt="Right Arrow" width={50} height={50} priority />
            </button>
          ) : nextHref ? ( // Only render Link if nextHref is provided
            <Link href={nextHref} className="p-2 hover:bg-red-500/10 transition-colors">
              <Image src="/images/arrowright.png" alt="Right Arrow" width={50} height={50} priority />
            </Link>
          ) : null}
        </div>

        {/* Step progress */}
        <div className="bg-white/10 border border-white rounded-2xl p-4 w-full min-h-[400px] flex flex-col justify-center items-center">
          <div className="flex justify-center mb-6">
            <ProgressCircle percentage={progressPercentage} />
          </div>

          <StepIndicator steps={currentSteps} currentStep={currentStep} className="space-y-4 text-white" />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-10">
        <div className="bg-slate-800 border-2 border-dashed border-red-500 rounded-xl p-8 min-h-[450px] w-full max-w-2xl mx-auto">
          {children}
        </div>

        <div className="backdrop-blur-md rounded-2xl p-2">
          <div className="flex justify-center mb-6">
            <ProgressCircle percentage={progressPercentage} />
          </div>

          <StepIndicator steps={currentSteps} currentStep={currentStep} className="space-y-4 text-white" />
        </div>
      </div>
    </div>
  )
}
