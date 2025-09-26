export interface User {
  id: string
  email: string
  userType: "candidate" | "recruiter"
  profile?: CandidateProfile | RecruiterProfile
}

export interface CandidateProfile {
  firstName?: string
  lastName?: string
  phone?: string
  resumeUrl?: string
  skills?: string[]
  education?: EducationItem[]
  profileCompletion: number
}

export interface RecruiterProfile {
  companyName?: string
  firstName?: string
  lastName?: string
  phone?: string
}

export interface EducationItem {
  institution: string
  degree: string
  field: string
  startYear: number
  endYear?: number
}

export interface AuthFormData {
  email: string
  userType: "candidate" | "recruiter"
}

export interface OTPFormData {
  otp: string
  email: string
}
