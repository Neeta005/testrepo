// User and Authentication Types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  userType: "candidate" | "recruiter"
  createdAt: Date
  updatedAt: Date
}

export interface CandidateProfile extends User {
  userType: "candidate"
  phone?: string
  skills: string[]
  education: Education[]
  experience?: Experience[]
  resume?: string
}

export interface RecruiterProfile extends User {
  userType: "recruiter"
  company: Company
  position: string
  phone?: string
}

// Education and Experience Types
export interface Education {
  id: string
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: Date
  endDate?: Date
  grade?: string
  description?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: Date
  endDate?: Date
  description?: string
  skills: string[]
}

// Company Types
export interface Company {
  id: string
  name: string
  description?: string
  industry: string
  size: string
  website?: string
  logo?: string
  address: Address
}

export interface Address {
  street: string
  city: string
  state: string
  country: string
  postalCode: string
}

// Job Posting Types
export interface JobPosting {
  id: string
  title: string
  description: string
  requirements: string[]
  responsibilities: string[]
  skills: string[]
  workType: WorkType
  workMode: WorkMode
  location: Address
  salary?: Salary
  benefits: string[]
  numberOfOpenings: number
  interviewDetails: InterviewDetails
  questions: string[]
  status: JobStatus
  recruiterId: string
  companyId: string
  createdAt: Date
  updatedAt: Date
}

export interface Salary {
  min: number
  max: number
  currency: string
  period: "hourly" | "monthly" | "yearly"
}

export interface InterviewDetails {
  method: InterviewMethod
  rounds: number
  duration?: string
  requirements?: string[]
}

// Enums and Union Types
export type WorkType = "full-time" | "part-time" | "contract" | "internship" | "freelance"
export type WorkMode = "remote" | "on-site" | "hybrid"
export type InterviewMethod = "face-to-face" | "video-call" | "phone-call" | "written-test"
export type JobStatus = "draft" | "published" | "closed" | "paused"

// Form Data Types
export interface JobPostingFormData {
  basicInfo: {
    title: string
    skills: string[]
    numberOfOpenings: number
  }
  workDetails: {
    workType: WorkType
    workMode: WorkMode
    interviewMethod: InterviewMethod
  }
  location: {
    city: string
    state: string
    country: string
    transportProvided: boolean
  }
  responsibilities: {
    description: string
    trainingProvided: boolean
    offerLetterProvided: boolean
    experienceCertificate: boolean
    stipend?: string
    bonus?: string
  }
  questions: string[]
  interviewDetails: InterviewDetails
}

export interface RegistrationFormData {
  candidate: {
    personalInfo: {
      name: string
      email: string
      phone: string
      password: string
    }
    educationDetails: {
      education: Education[]
      skills: string[]
    }
  }
  recruiter: {
    personalInfo: {
      name: string
      email: string
      phone: string
      password: string
      position: string
    }
    companyDetails: {
      name: string
      description: string
      industry: string
      size: string
      website?: string
    }
    companyAddress: Address
  }
}

// Step and Progress Types
export interface Step {
  id: string
  label: string
  completed: boolean
  href?: string
}

export interface StepProgress {
  currentStep: number
  totalSteps: number
  percentage: number
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

// Form Validation Types
export interface FormErrors {
  [key: string]: string | string[] | FormErrors
}

export interface FormState<T = any> {
  data: T
  errors: FormErrors
  isSubmitting: boolean
  isValid: boolean
}
