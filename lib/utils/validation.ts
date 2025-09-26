import { VALIDATION_RULES } from "@/lib/constants"
import type { FormErrors } from "@/lib/types"

export function validateEmail(email: string): string | null {
  if (!email.trim()) {
    return "Email is required"
  }
  if (!VALIDATION_RULES.email.test(email)) {
    return "Please enter a valid email address"
  }
  return null
}

export function validatePhone(phone: string): string | null {
  if (!phone.trim()) {
    return "Phone number is required"
  }
  if (!VALIDATION_RULES.phone.test(phone)) {
    return "Please enter a valid phone number"
  }
  return null
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return "Password is required"
  }
  if (password.length < VALIDATION_RULES.password.minLength) {
    return `Password must be at least ${VALIDATION_RULES.password.minLength} characters long`
  }
  if (VALIDATION_RULES.password.requireUppercase && !/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter"
  }
  if (VALIDATION_RULES.password.requireLowercase && !/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter"
  }
  if (VALIDATION_RULES.password.requireNumbers && !/\d/.test(password)) {
    return "Password must contain at least one number"
  }
  return null
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value.trim()) {
    return `${fieldName} is required`
  }
  return null
}

export function validateForm<T extends Record<string, any>>(
  data: T,
  validators: Record<keyof T, (value: any) => string | null>,
): FormErrors {
  const errors: FormErrors = {}

  for (const [field, validator] of Object.entries(validators)) {
    const error = validator(data[field])
    if (error) {
      errors[field] = error
    }
  }

  return errors
}

// Specific form validators
export function validateCandidateBasicInfo(data: {
  name: string
  email: string
  phone: string
  password: string
}): FormErrors {
  return validateForm(data, {
    name: (value) => validateRequired(value, "Full name"),
    email: validateEmail,
    phone: validatePhone,
    password: validatePassword,
  })
}

export function validateRecruiterPersonalInfo(data: {
  name: string
  email: string
  phone: string
  password: string
  position: string
}): FormErrors {
  return validateForm(data, {
    name: (value) => validateRequired(value, "Full name"),
    email: validateEmail,
    phone: validatePhone,
    password: validatePassword,
    position: (value) => validateRequired(value, "Position"),
  })
}

export function validateCompanyDetails(data: {
  name: string
  description: string
  industry: string
  size: string
}): FormErrors {
  return validateForm(data, {
    name: (value) => validateRequired(value, "Company name"),
    description: (value) => validateRequired(value, "Company description"),
    industry: (value) => validateRequired(value, "Industry"),
    size: (value) => validateRequired(value, "Company size"),
  })
}

export function validateJobBasicInfo(data: {
  title: string
  skills: string[]
  numberOfOpenings: number
}): FormErrors {
  const errors: FormErrors = {}

  if (!data.title.trim()) {
    errors.title = "Role name is required"
  }

  if (data.skills.length === 0) {
    errors.skills = "At least one skill is required"
  }

  if (data.numberOfOpenings < 1) {
    errors.numberOfOpenings = "Number of openings must be at least 1"
  }

  return errors
}
