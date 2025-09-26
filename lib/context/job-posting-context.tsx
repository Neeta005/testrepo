"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import { DEFAULT_JOB_POSTING_FORM } from "@/lib/data/mock-data"
import type { JobPostingFormData } from "@/lib/types"

interface JobPostingState {
  formData: JobPostingFormData
  currentStep: number
  isSubmitting: boolean
  errors: Record<string, string>
}

type JobPostingAction =
  | { type: "UPDATE_BASIC_INFO"; payload: JobPostingFormData["basicInfo"] }
  | { type: "UPDATE_WORK_DETAILS"; payload: JobPostingFormData["workDetails"] }
  | { type: "UPDATE_RESPONSIBILITIES"; payload: JobPostingFormData["responsibilities"] }
  | { type: "UPDATE_QUESTIONS"; payload: string[] }
  | { type: "UPDATE_INTERVIEW_DETAILS"; payload: JobPostingFormData["interviewDetails"] }
  | { type: "SET_CURRENT_STEP"; payload: number }
  | { type: "SET_ERRORS"; payload: Record<string, string> }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "RESET_FORM" }

const initialState: JobPostingState = {
  formData: DEFAULT_JOB_POSTING_FORM,
  currentStep: 0,
  isSubmitting: false,
  errors: {},
}

function jobPostingReducer(state: JobPostingState, action: JobPostingAction): JobPostingState {
  switch (action.type) {
    case "UPDATE_BASIC_INFO":
      return {
        ...state,
        formData: { ...state.formData, basicInfo: action.payload },
        errors: {},
      }
    case "UPDATE_WORK_DETAILS":
      return {
        ...state,
        formData: { ...state.formData, workDetails: action.payload },
        errors: {},
      }
    case "UPDATE_LOCATION":
      return {
        ...state,
        formData: { ...state.formData, location: action.payload },
        errors: {},
      }
    case "UPDATE_RESPONSIBILITIES":
      return {
        ...state,
        formData: { ...state.formData, responsibilities: action.payload },
        errors: {},
      }
    case "UPDATE_QUESTIONS":
      return {
        ...state,
        formData: { ...state.formData, questions: action.payload },
        errors: {},
      }
    case "UPDATE_INTERVIEW_DETAILS":
      return {
        ...state,
        formData: { ...state.formData, interviewDetails: action.payload },
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

const JobPostingContext = createContext<{
  state: JobPostingState
  dispatch: React.Dispatch<JobPostingAction>
} | null>(null)

export function JobPostingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(jobPostingReducer, initialState)

  return <JobPostingContext.Provider value={{ state, dispatch }}>{children}</JobPostingContext.Provider>
}

export function useJobPosting() {
  const context = useContext(JobPostingContext)
  if (!context) {
    throw new Error("useJobPosting must be used within a JobPostingProvider")
  }
  return context
}

// Helper hooks for specific form sections
export function useJobPostingBasicInfo() {
  const { state, dispatch } = useJobPosting()
  return {
    data: state.formData.basicInfo,
    updateData: (data: JobPostingFormData["basicInfo"]) => dispatch({ type: "UPDATE_BASIC_INFO", payload: data }),
    errors: state.errors,
  }
}

export function useJobPostingWorkDetails() {
  const { state, dispatch } = useJobPosting()
  return {
    data: state.formData.workDetails,
    updateData: (data: JobPostingFormData["workDetails"]) => dispatch({ type: "UPDATE_WORK_DETAILS", payload: data }),
    errors: state.errors,
  }
}

export function useJobPostingLocation() {
  const { state, dispatch } = useJobPosting()
  return {
    data: state.formData.location,
    updateData: (data: JobPostingFormData["location"]) => dispatch({ type: "UPDATE_LOCATION", payload: data }),
    errors: state.errors,
  }
}
