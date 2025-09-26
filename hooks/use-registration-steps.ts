"use client"

import { useState } from "react"

interface RegistrationStep {
  id: string
  title: string
  completed: boolean
}

export function useRegistrationSteps(initialSteps: RegistrationStep[]) {
  const [steps, setSteps] = useState(initialSteps)

  const updateStepCompletion = (stepId: string, completed: boolean) => {
    setSteps((prevSteps) => prevSteps.map((step) => (step.id === stepId ? { ...step, completed } : step)))
  }

  const getProgressPercentage = () => {
    const completedSteps = steps.filter((step) => step.completed).length
    return Math.round((completedSteps / steps.length) * 100)
  }

  return {
    steps,
    updateStepCompletion,
    getProgressPercentage,
  }
}
