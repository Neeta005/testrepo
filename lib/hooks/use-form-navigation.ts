"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"

interface UseFormNavigationProps {
  steps: Array<{ href?: string }>
  currentStep: number
  onStepChange?: (step: number) => void
}

export function useFormNavigation({ steps, currentStep, onStepChange }: UseFormNavigationProps) {
  const router = useRouter()

  const goToNext = useCallback(() => {
    const nextStep = currentStep + 1
    if (nextStep < steps.length) {
      onStepChange?.(nextStep)
      const nextHref = steps[nextStep]?.href
      if (nextHref) {
        router.push(nextHref)
      }
    }
  }, [currentStep, steps, onStepChange, router])

  const goToPrevious = useCallback(() => {
    const prevStep = currentStep - 1
    if (prevStep >= 0) {
      onStepChange?.(prevStep)
      const prevHref = steps[prevStep]?.href
      if (prevHref) {
        router.push(prevHref)
      }
    }
  }, [currentStep, steps, onStepChange, router])

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < steps.length) {
        onStepChange?.(step)
        const stepHref = steps[step]?.href
        if (stepHref) {
          router.push(stepHref)
        }
      }
    },
    [steps, onStepChange, router],
  )

  return {
    goToNext,
    goToPrevious,
    goToStep,
    canGoNext: currentStep < steps.length - 1,
    canGoPrevious: currentStep > 0,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
  }
}
