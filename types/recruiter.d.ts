// Recruiter-specific TypeScript types

export interface RecruiterJobPostingState {
  // Basic Info
  jobTitle: string
  companyName: string
  jobDescription: string

  // Work Type
  workType: "full-time" | "part-time" | "contract" | "internship"

  // Responsibilities
  rolesResponsibilities: string
  trainingProvided: boolean
  offerLetterProvided: boolean
  experienceCertificate: boolean
  stipend: string
  stipendCurrency: string
  bonus: string
  bonusCurrency: string

  // Location
  city: string
  state: string
  country: string
  transportProvided: boolean

  // Questions
  questions: Question[]

  // Interview Details
  interviewType: "in-person" | "virtual" | "hybrid"
  interviewDate: string
  interviewTime: string
  interviewLocation?: string
}

export interface Question {
  id: string
  type: "true-false" | "single-word" | "long-question" | "multiple-choice"
  question: string
  options?: string[] // for multiple choice
  correctAnswer?: string | boolean
}

export interface Location {
  lat: number
  lng: number
  address: string
}

export interface ToggleOption {
  label: string
  state: boolean
  setState: (value: boolean) => void
}

export interface CurrencyFieldConfig {
  label: string
  value: string
  setValue: (value: string) => void
  currency: string
  setCurrency: (currency: string) => void
  info?: boolean
}

export interface QuestionType {
  type: string
  label: string
  icon: string
}

export interface WorkTypeOption {
  id: string
  label: string
  value: string
  description: string
}
