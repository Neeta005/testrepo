import { JOB_POSTING_PROGRESS, CANDIDATE_REGISTRATION_PROGRESS, RECRUITER_REGISTRATION_PROGRESS } from "@/lib/constants"

export function getJobPostingProgress(currentStep: number): number {
  return JOB_POSTING_PROGRESS[currentStep] ?? 0
}

export function getCandidateRegistrationProgress(currentStep: number): number {
  return CANDIDATE_REGISTRATION_PROGRESS[currentStep] ?? 0
}

export function getRecruiterRegistrationProgress(currentStep: number): number {
  return RECRUITER_REGISTRATION_PROGRESS[currentStep] ?? 0
}

export function calculateProgress(currentStep: number, totalSteps: number): number {
  if (totalSteps === 0) return 0
  return Math.round((currentStep / totalSteps) * 100)
}

export function getNextStep(currentStep: number, totalSteps: number): number {
  return Math.min(currentStep + 1, totalSteps - 1)
}

export function getPreviousStep(currentStep: number): number {
  return Math.max(currentStep - 1, 0)
}
