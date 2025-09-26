"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import { DEFAULT_CANDIDATE_REGISTRATION, DEFAULT_RECRUITER_REGISTRATION } from "@/lib/data/mock-data"
import type { RegistrationFormData } from "@/lib/types"

interface RegistrationState {
  userType: "candidate" | "recruiter"
  candidateData: RegistrationFormData["candidate"]
  recruiterData: RegistrationFormData["recruiter"]
  currentStep: number
  isSubmitting: boolean
  errors: Record<string, string>
}

type RegistrationAction =
  | { type: "SET_USER_TYPE"; payload: "candidate" | "recruiter" }
  | { type: "UPDATE_CANDIDATE_PERSONAL_INFO"; payload: RegistrationFormData["candidate"]["personalInfo"] }
  | { type: "UPDATE_CANDIDATE_EDUCATION"; payload: RegistrationFormData["candidate"]["educationDetails"] }
  | { type: "UPDATE_RECRUITER_PERSONAL_INFO"; payload: RegistrationFormData["recruiter"]["personalInfo"] }
  | { type: "UPDATE_COMPANY_DETAILS"; payload: RegistrationFormData["recruiter"]["companyDetails"] }
  | { type: "UPDATE_COMPANY_ADDRESS"; payload: RegistrationFormData["recruiter"]["companyAddress"] }
  | { type: "SET_CURRENT_STEP"; payload: number }
  | { type: "SET_ERRORS"; payload: Record<string, string> }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "RESET_FORM" }

const initialState: RegistrationState = {
  userType: "candidate",
  candidateData: DEFAULT_CANDIDATE_REGISTRATION,
  recruiterData: DEFAULT_RECRUITER_REGISTRATION,
  currentStep: 0,
  isSubmitting: false,
  errors: {},
}

function registrationReducer(state: RegistrationState, action: RegistrationAction): RegistrationState {
  switch (action.type) {
    case "SET_USER_TYPE":
      return { ...state, userType: action.payload, currentStep: 0, errors: {} }
    case "UPDATE_CANDIDATE_PERSONAL_INFO":
      return {
        ...state,
        candidateData: { ...state.candidateData, personalInfo: action.payload },
        errors: {},
      }
    case "UPDATE_CANDIDATE_EDUCATION":
      return {
        ...state,
        candidateData: { ...state.candidateData, educationDetails: action.payload },
        errors: {},
      }
    case "UPDATE_RECRUITER_PERSONAL_INFO":
      return {
        ...state,
        recruiterData: { ...state.recruiterData, personalInfo: action.payload },
        errors: {},
      }
    case "UPDATE_COMPANY_DETAILS":
      return {
        ...state,
        recruiterData: { ...state.recruiterData, companyDetails: action.payload },
        errors: {},
      }
    case "UPDATE_COMPANY_ADDRESS":
      return {
        ...state,
        recruiterData: { ...state.recruiterData, companyAddress: action.payload },
        errors: {},
      }
    case "SET_CURRENT_STEP":
      return { ...state, currentStep: action.payload }
    case "SET_ERRORS":
      return { ...state, errors: action.payload }
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload }
    case "RESET_FORM":
      return initialState
    default:
      return state
  }
}

const RegistrationContext = createContext<{
  state: RegistrationState
  dispatch: React.Dispatch<RegistrationAction>
} | null>(null)

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(registrationReducer, initialState)

  return <RegistrationContext.Provider value={{ state, dispatch }}>{children}</RegistrationContext.Provider>
}

export function useRegistration() {
  const context = useContext(RegistrationContext)
  if (!context) {
    throw new Error("useRegistration must be used within a RegistrationProvider")
  }
  return context
}
