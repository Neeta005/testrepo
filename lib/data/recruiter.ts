// Static data for recruiter components

export const currencyOptions = ["Currency", "USD", "INR", "EUR", "GBP", "CAD", "AUD"]

export const questionTypes = [
  { type: "true-false", label: "True/False", icon: "/images/icon1.png" },
  { type: "single-word", label: "Single Word", icon: "/images/icon2.png" },
  { type: "long-question", label: "Long Question", icon: "/images/icon3.png" },
  { type: "multiple-choice", label: "Multiple Choice", icon: "/images/icon4.png" },
]

export const workTypeOptions = [
  {
    id: "full-time",
    label: "Full Time",
    value: "full-time",
    description: "40+ hours per week",
  },
  {
    id: "part-time",
    label: "Part Time",
    value: "part-time",
    description: "Less than 40 hours per week",
  },
  {
    id: "contract",
    label: "Contract",
    value: "contract",
    description: "Fixed-term engagement",
  },
  {
    id: "internship",
    label: "Internship",
    value: "internship",
    description: "Learning-focused position",
  },
]

export const toggleLabels = {
  trainingProvided: "Training will be provided",
  offerLetterProvided: "Offer Letter will be provided",
  experienceCertificate: "Experience certificate will be provided",
  transportProvided: "Transport will be provided (within 5 km)",
}

export const fieldLabels = {
  rolesResponsibilities: "Roles & Responsibilities",
  stipend: "Stipend/month",
  bonus: "Bonus",
  city: "City",
  state: "State",
  country: "Country",
  officeLocation: "Office Location",
}

export const placeholders = {
  rolesResponsibilities: "Write roles & responsibilities here...",
  textfield: "Textfield",
  currency: "Currency",
}

export const richTextToolbarConfig = {
  textFormats: [
    { value: "normal", label: "Normal text" },
    { value: "heading1", label: "Heading 1" },
    { value: "heading2", label: "Heading 2" },
  ],
}

export const recruiterRegistrationSteps = [
  { id: "company", label: "Company Details", completed: false },
  { id: "address", label: "Company Address", completed: false },
  { id: "contact", label: "Contact Person", completed: false },
]
