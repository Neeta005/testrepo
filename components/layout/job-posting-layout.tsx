"use client"

import Image from "next/image"
import { ProgressCircle } from "@/components/ui/progress-circle"
import { StepIndicator } from "@/components/ui/step-indicator"
import { Button } from "@/components/ui/button"
import { JOB_POSTING_STEPS, JOB_POSTING_PROGRESS } from "@/lib/constants"
import Link from "next/link"
import type { ReactNode } from "react"

interface JobPostingLayoutProps {
  title: string
  nextHref: string
  currentStep: number
  children: ReactNode
  onPrevious?: () => void
  onNext?: () => void
  nextButtonText?: string
  onNextClick?: () => void
}

export function JobPostingLayout({
  title,
  nextHref,
  currentStep,
  children,
  onPrevious,
  onNext,
  nextButtonText = "Next",
  onNextClick,
}: JobPostingLayoutProps) {
  const progressPercentage = JOB_POSTING_PROGRESS[currentStep] ?? 0

  const currentSteps = JOB_POSTING_STEPS.map((step, index) => ({
    ...step,
    completed: index < currentStep,
  }))

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-8 px-4 lg:px-8 py-12">
      <div className="relative mb-10">
  {/* Title stays shifted from left */}
  <h1 className="text-4xl font-semibold text-white ml-28">{title}</h1>

  {/* Fixed position button */}
  <div className="absolute top-0 right-99">
    {onNextClick ? (
      <Button
        onClick={onNextClick}
        className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold px-8 py-2 rounded-md shadow-md hover:opacity-90"
      >
        {nextButtonText}
      </Button>
    ) : (
      <Link href={nextHref}>
        <Button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold px-8 py-2 rounded-md shadow-md hover:opacity-90">
          {nextButtonText}
        </Button>
      </Link>
    )}
  </div>
</div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid grid-cols-[50px_1fr_50px_280px] gap-x-8 items-start">
          {/* Left Arrow */}
          <div className="flex justify-start mt-50">
            <button className="p-2 hover:bg-red-500/10 transition-colors" aria-label="Previous" onClick={onPrevious}>
              <Image src="/images/arrowleft.png" alt="Left Arrow" width={50} height={50} priority />
            </button>
          </div>

          <div className="rounded-xl p-10 w-full min-h-[500px] max-w-5xl">{children}</div>

          {/* Right Arrow */}
          <div className="flex justify-start mt-50">
            <button className="p-2 hover:bg-red-500/10 transition-colors" aria-label="Next" onClick={onNext}>
              <Image src="/images/arrowright.png" alt="Right Arrow" width={50} height={50} priority />
            </button>
          </div>

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
    </div>
  )
}
