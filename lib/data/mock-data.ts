import type { JobPosting, Company, Education, Experience } from "@/lib/types"

// Mock Skills Data
export const POPULAR_SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "HTML/CSS",
  "SQL",
  "UI/UX Design",
  "Figma",
  "Adobe Creative Suite",
  "Project Management",
  "Agile",
  "Scrum",
  "Data Analysis",
  "Machine Learning",
  "AI",
  "Digital Marketing",
  "SEO",
  "Content Writing",
]

// Mock Education Data
export const SAMPLE_EDUCATION: Education[] = [
  {
    id: "1",
    institution: "University of Technology",
    degree: "Bachelor of Technology",
    fieldOfStudy: "Computer Science",
    startDate: new Date("2020-08-01"),
    endDate: new Date("2024-05-31"),
    grade: "8.5 CGPA",
  },
]

// Mock Experience Data
export const SAMPLE_EXPERIENCE: Experience[] = [
  {
    id: "1",
    company: "Tech Solutions Inc.",
    position: "Frontend Developer Intern",
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-08-31"),
    description: "Developed responsive web applications using React and TypeScript",
    skills: ["React", "TypeScript", "CSS", "JavaScript"],
  },
]

// Mock Company Data
export const SAMPLE_COMPANIES: Company[] = [
  {
    id: "1",
    name: "TechCorp Solutions",
    description: "Leading technology solutions provider",
    industry: "technology",
    size: "201-500",
    website: "https://techcorp.com",
    address: {
      street: "123 Tech Street",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      postalCode: "400001",
    },
  },
]

// Mock Job Postings
export const SAMPLE_JOB_POSTINGS: JobPosting[] = [
  {
    id: "1",
    title: "Frontend Developer",
    description: "We are looking for a skilled Frontend Developer to join our team.",
    requirements: ["2+ years experience", "React expertise", "TypeScript knowledge"],
    responsibilities: ["Develop user interfaces", "Collaborate with design team", "Write clean code"],
    skills: ["React", "TypeScript", "CSS", "JavaScript"],
    workType: "full-time",
    workMode: "hybrid",
    location: {
      street: "123 Tech Street",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      postalCode: "400001",
    },
    salary: {
      min: 600000,
      max: 1200000,
      currency: "INR",
      period: "yearly",
    },
    benefits: ["Health Insurance", "Flexible Hours", "Remote Work"],
    numberOfOpenings: 3,
    interviewDetails: {
      method: "video-call",
      rounds: 3,
      duration: "1 hour per round",
    },
    questions: ["Tell us about your React experience", "How do you handle state management?"],
    status: "published",
    recruiterId: "1",
    companyId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Default Form Values
export const DEFAULT_JOB_POSTING_FORM = {
  basicInfo: {
    title: "",
    skills: [],
    numberOfOpenings: 1,
  },
  workDetails: {
    workType: "full-time" as const,
    workMode: "on-site" as const,
    interviewMethod: "face-to-face" as const,
  },
  location: {
    city: "",
    state: "",
    country: "India",
    transportProvided: false,
  },
  responsibilities: {
    description: "",
    trainingProvided: false,
    offerLetterProvided: false,
    experienceCertificate: false,
    stipend: "",
    bonus: "",
  },
  questions: [],
  interviewDetails: {
    method: "face-to-face" as const,
    rounds: 1,
  },
}

export const DEFAULT_CANDIDATE_REGISTRATION = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    password: "",
  },
  educationDetails: {
    education: [],
    skills: [],
  },
}

export const DEFAULT_RECRUITER_REGISTRATION = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    password: "",
    position: "",
  },
  companyDetails: {
    name: "",
    description: "",
    industry: "",
    size: "",
    website: "",
  },
  companyAddress: {
    street: "",
    city: "",
    state: "",
    country: "India",
    postalCode: "",
  },
}
