"use client"

import { useState, useEffect } from "react"

interface CandidateProgress {
  resume: boolean
  phone: boolean
  personal: boolean
  education: boolean
}

export function useCandidateProgress() {
  const [progress, setProgress] = useState<CandidateProgress>({
    resume: false,
    phone: false,
    personal: false,
    education: false,
  })

  useEffect(() => {
    const storedProgress = localStorage.getItem("candidateRegistrationProgress")
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress))
    }
  }, [])

  const updateProgress = (step: keyof CandidateProgress, completed: boolean) => {
    const updatedProgress = { ...progress, [step]: completed }
    localStorage.setItem("candidateRegistrationProgress", JSON.stringify(updatedProgress))
    setProgress(updatedProgress)
  }

  const getProgressPercentage = () => {
    const completedSteps = Object.values(progress).filter(Boolean).length
    return Math.round((completedSteps / Object.keys(progress).length) * 100)
  }

  return {
    progress,
    updateProgress,
    getProgressPercentage,
  }
}
