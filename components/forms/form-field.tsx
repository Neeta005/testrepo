"use client"

import type { ReactNode } from "react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import React from "react"

interface FormFieldProps {
  label: string
  htmlFor?: string
  required?: boolean
  error?: string
  children: ReactNode
  className?: string
  description?: string
}

export function FormField({
  label,
  htmlFor,
  required = false,
  error,
  children,
  className,
  description,
}: FormFieldProps) {
  const childrenWithError = React.isValidElement(children)
    ? React.cloneElement(children as any, { hasError: !!error })
    : children

  return (
    <div className={cn("space-y-3", className)}>
      <Label htmlFor={htmlFor} className="text-white text-base flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      {description && <p className="text-sm text-gray-400">{description}</p>}
      {childrenWithError}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}
