// Mock API service layer - replace with actual API calls
import type {
  JobPosting,
  CandidateProfile,
  RecruiterProfile,
  JobPostingFormData,
  RegistrationFormData,
  ApiResponse,
} from "@/lib/types"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Job Posting API
export const jobPostingApi = {
  async create(data: JobPostingFormData): Promise<ApiResponse<JobPosting>> {
    await delay(1000)
    // Mock successful creation
    return {
      success: true,
      data: {
        id: Date.now().toString(),
        title: data.basicInfo.title,
        description: data.responsibilities.description,
        requirements: [],
        responsibilities: [],
        skills: data.basicInfo.skills,
        workType: data.workDetails.workType,
        workMode: data.workDetails.workMode,
        location: {
          street: "",
          city: data.location.city,
          state: data.location.state,
          country: data.location.country,
          postalCode: "",
        },
        benefits: [],
        numberOfOpenings: data.basicInfo.numberOfOpenings,
        interviewDetails: data.interviewDetails,
        questions: data.questions,
        status: "draft",
        recruiterId: "1",
        companyId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }
  },

  async update(id: string, data: Partial<JobPostingFormData>): Promise<ApiResponse<JobPosting>> {
    await delay(800)
    return { success: true, message: "Job posting updated successfully" }
  },

  async delete(id: string): Promise<ApiResponse> {
    await delay(500)
    return { success: true, message: "Job posting deleted successfully" }
  },

  async getById(id: string): Promise<ApiResponse<JobPosting>> {
    await delay(600)
    return { success: true, data: {} as JobPosting }
  },

  async getAll(): Promise<ApiResponse<JobPosting[]>> {
    await delay(800)
    return { success: true, data: [] }
  },
}

// Authentication API
export const authApi = {
  async registerCandidate(data: RegistrationFormData["candidate"]): Promise<ApiResponse<CandidateProfile>> {
    await delay(1200)
    return {
      success: true,
      data: {
        id: Date.now().toString(),
        email: data.personalInfo.email,
        name: data.personalInfo.name,
        userType: "candidate",
        phone: data.personalInfo.phone,
        skills: data.educationDetails.skills,
        education: data.educationDetails.education,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }
  },

  async registerRecruiter(data: RegistrationFormData["recruiter"]): Promise<ApiResponse<RecruiterProfile>> {
    await delay(1200)
    return {
      success: true,
      data: {
        id: Date.now().toString(),
        email: data.personalInfo.email,
        name: data.personalInfo.name,
        userType: "recruiter",
        position: data.personalInfo.position,
        phone: data.personalInfo.phone,
        company: {
          id: Date.now().toString(),
          name: data.companyDetails.name,
          description: data.companyDetails.description,
          industry: data.companyDetails.industry,
          size: data.companyDetails.size,
          website: data.companyDetails.website,
          address: data.companyAddress,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }
  },

  async sendOTP(phoneOrEmail: string): Promise<ApiResponse> {
    await delay(800)
    return { success: true, message: "OTP sent successfully" }
  },

  async verifyOTP(phoneOrEmail: string, otp: string): Promise<ApiResponse> {
    await delay(1000)
    // Mock verification - in real app, validate against backend
    if (otp === "123456") {
      return { success: true, message: "OTP verified successfully" }
    }
    return { success: false, message: "Invalid OTP" }
  },

  async login(email: string, password: string): Promise<ApiResponse<CandidateProfile | RecruiterProfile>> {
    await delay(1000)
    return { success: true, data: {} as CandidateProfile }
  },
}

// Generic API utilities
export function handleApiError(error: any): string {
  if (error?.response?.data?.message) {
    return error.response.data.message
  }
  if (error?.message) {
    return error.message
  }
  return "An unexpected error occurred"
}

export function isApiError(response: ApiResponse): boolean {
  return !response.success
}
