import type { Step } from "@/lib/types"

// Job Posting Steps
export const JOB_POSTING_STEPS: Step[] = [
  { id: "basic-info", label: "Basic Info", completed: false, href: "/recruiter/post-job/basic-info" },
  { id: "work-type", label: "Work Type", completed: false, href: "/recruiter/post-job/work-type" },
  { id: "location", label: "Location", completed: false, href: "/recruiter/post-job/location" },
  { id: "responsibilities", label: "Responsibilities", completed: false, href: "/recruiter/post-job/responsibilities" },
  { id: "questions", label: "Questions", completed: false, href: "/recruiter/post-job/questions" },
  {
    id: "interview-details",
    label: "Interview Details",
    completed: false,
    href: "/recruiter/post-job/interview-details",
  },
  { id: "review", label: "Review", completed: false, href: "/recruiter/post-job/review" },
]

// Registration Steps
export const CANDIDATE_REGISTRATION_STEPS: Step[] = [
  { id: "basic-info", label: "Basic Info", completed: false, href: "/candidate/register/basic-info" },
  { id: "educational-details", label: "Education", completed: false, href: "/candidate/register/educational-details" },
  { id: "otp-verification", label: "Verification", completed: false, href: "/candidate/register/otp-verification" },
]

export const RECRUITER_REGISTRATION_STEPS: Step[] = [
  { id: "recruiter-info", label: "Personal Info", completed: false, href: "/recruiter/register/recruiter-info" },
  { id: "company-details", label: "Company Details", completed: false, href: "/recruiter/register/company-details" },
  { id: "company-address", label: "Company Address", completed: false, href: "/recruiter/register/company-address" },
]

// Progress Percentages
export const JOB_POSTING_PROGRESS: number[] = [15, 30, 45, 60, 75, 90, 100]
export const CANDIDATE_REGISTRATION_PROGRESS: number[] = [33, 66, 100]
export const RECRUITER_REGISTRATION_PROGRESS: number[] = [33, 66, 100]

// Form Options
export const WORK_TYPES = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "freelance", label: "Freelance" },
] as const

export const WORK_MODES = [
  { value: "remote", label: "Remote" },
  { value: "on-site", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
] as const

export const INTERVIEW_METHODS = [
  { value: "face-to-face", label: "Face to Face" },
  { value: "video-call", label: "Video Call" },
  { value: "phone-call", label: "Phone Call" },
  { value: "written-test", label: "Written Test" },
] as const

export const COMPANY_SIZES = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
] as const

export const INDUSTRIES = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "consulting", label: "Consulting" },
  { value: "other", label: "Other" },
] as const

// Validation Rules
export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s-()]+$/,
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
  },
} as const
