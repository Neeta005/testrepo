"use client"

import { useState, useCallback } from "react"
import type { FormErrors } from "@/lib/types"

export function useFormValidation<T extends Record<string, any>>(initialData: T, validator: (data: T) => FormErrors) {
  const [data, setData] = useState<T>(initialData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = useCallback(
    (field: keyof T, value: any) => {
      setData((prev) => ({ ...prev, [field]: value }))
      // Clear error for this field when user starts typing
      if (errors[field as string]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[field as string]
          return newErrors
        })
      }
    },
    [errors],
  )

  const updateData = useCallback((newData: Partial<T>) => {
    setData((prev) => ({ ...prev, ...newData }))
  }, [])

  const validate = useCallback(() => {
    const validationErrors = validator(data)
    setErrors(validationErrors)
    return Object.keys(validationErrors).length === 0
  }, [data, validator])

  const reset = useCallback(() => {
    setData(initialData)
    setErrors({})
    setIsSubmitting(false)
  }, [initialData])

  const submit = useCallback(
    async (onSubmit: (data: T) => Promise<void> | void) => {
      setIsSubmitting(true)
      try {
        if (validate()) {
          await onSubmit(data)
        }
      } finally {
        setIsSubmitting(false)
      }
    },
    [data, validate],
  )

  return {
    data,
    errors,
    isSubmitting,
    updateField,
    updateData,
    validate,
    reset,
    submit,
    isValid: Object.keys(errors).length === 0,
  }
}
