"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { RegistrationPageLayout } from "@/components/layout/registration-page-layout"
import { CompanyDetailsForm } from "@/components/recruiter/company-details-form"
import { RichTextEditor } from "@/components/recruiter/rich-text-editor"
import { recruiterNavigationItems } from "@/lib/data"
import { setRecruiterStepComplete, calcRecruiterProgressPercent } from "@/lib/progress"

export default function RecruiterRegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: "Software company",
    companySize: "Software company",
    aboutUs: "",
  })

  // Progress calculation
  const requiredFields: (keyof typeof formData)[] = ["companyName", "companySize", "aboutUs"]
  const allFilled = requiredFields.every((key) => {
    const v = formData[key]
    if (typeof v === "string") return v.trim().length > 0
    return !!v
  })

  if (typeof window !== "undefined") {
    setRecruiterStepComplete("companyDetails", allFilled)
  }

  const percent = typeof window !== "undefined" ? calcRecruiterProgressPercent() : 0

  return (
    <PageLayout navigationItems={recruiterNavigationItems}>
      <RegistrationPageLayout
        title="Register"
        nextHref="/recruiter/register/company-details"
        currentStep={1}
        completionPercentage={percent}
      >
        <p className="text-md text-gray-400 mb-6">Company Details</p>

        <div className="space-y-6">
          <CompanyDetailsForm
            companyName={formData.companyName}
            companySize={formData.companySize}
            aboutUs={formData.aboutUs}
            onCompanyNameChange={(name) => setFormData({ ...formData, companyName: name })}
            onCompanySizeChange={(size) => setFormData({ ...formData, companySize: size })}
            onAboutUsChange={(aboutUs) => setFormData({ ...formData, aboutUs })}
          />

          {/* About Us with Rich Text Editor */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">About Us</label>
            <RichTextEditor value={formData.aboutUs} onChange={(aboutUs) => setFormData({ ...formData, aboutUs })} />
          </div>
        </div>
      </RegistrationPageLayout>
    </PageLayout>
  )
}
