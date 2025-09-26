"use client"

import { ProgressCircle } from "@/components/ui/progress-circle"
import { StepIndicator } from "@/components/ui/step-indicator"

interface RegistrationStep {
  id: string
  title: string
  completed: boolean
}

interface RegistrationProgressProps {
  steps: RegistrationStep[]
  progressPercentage: number
}

export function RegistrationProgress({ steps, progressPercentage }: RegistrationProgressProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6">
      <div className="text-center mb-6">
        <ProgressCircle percentage={progressPercentage} />
      </div>

      <StepIndicator steps={steps} />
    </div>
  )
}
