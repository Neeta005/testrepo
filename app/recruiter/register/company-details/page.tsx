"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { RegistrationPageLayout } from "@/components/layout/registration-page-layout"
import { recruiterNavigationItems } from "@/lib/data"
import { setRecruiterStepComplete, calcRecruiterProgressPercent } from "@/lib/progress"

export default function CompanyDetailsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    gstDetails: "",
    companyWebsite: "",
    linkedinPage: "",
    companySize: "Software company",
    companyType: "",
  });

  const companyTypes = [
    {
      id: "startup",
      title: "Startup",
      description: "A young company focused on innovation and rapid growth, often exploring new markets.",
    },
    {
      id: "sme",
      title: "SME",
      description: "Business with limited employees and turnover, catering to niche markets.",
    },
    {
      id: "mnc",
      title: "MNC",
      description: "A large organization operating in multiple countries with established global influence",
    },
  ];

  // Track progress for step completion
  const requiredFields: (keyof typeof formData)[] = [
    "gstDetails",
    "companyWebsite",
    "linkedinPage",
    "companySize",
    "companyType"
  ];
  const allFilled = requiredFields.every((key) => {
    const v = formData[key];
    if (typeof v === "string") return v.trim().length > 0;
    return !!v;
  });

  if (typeof window !== "undefined") {
    setRecruiterStepComplete("companyDetails", allFilled);
  }

  const percent = typeof window !== "undefined" ? calcRecruiterProgressPercent() : 0;

  // Common class for all text fields and select
  const inputClasses =
    "bg-slate-900 border border-white text-white placeholder:text-gray-400 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-red-500 focus:ring-0 w-full appearance-none";

  return (
    <PageLayout navigationItems={recruiterNavigationItems}>
      <RegistrationPageLayout
        title="Register"
        nextHref="/recruiter/register/company-address"
        currentStep={2}
        completionPercentage={percent}
      >
        <div className="space-y-6">
          {/* GST Details */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">GST Details</label>
            <input
              type="text"
              value={formData.gstDetails}
              onChange={(e) => setFormData({ ...formData, gstDetails: e.target.value })}
              className={inputClasses}
            />
          </div>

          {/* Company Website */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">Company Website</label>
            <input
              type="text"
              value={formData.companyWebsite}
              onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
              className={inputClasses}
            />
          </div>

          {/* LinkedIn Page */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">LinkedIn Page</label>
            <input
              type="text"
              value={formData.linkedinPage}
              onChange={(e) => setFormData({ ...formData, linkedinPage: e.target.value })}
              className={inputClasses}
            />
          </div>

          {/* Company Size */}
        

          {/* Company Type Selection */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {companyTypes.map((type) => {
              const isSelected = formData.companyType === type.id;
              return (
                <div
                  key={type.id}
                  tabIndex={0}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 focus:outline-none focus:ring-0 ${
                    isSelected
                      ? "border-red-500 bg-red-500/10 shadow-lg"
                      : "border-white bg-slate-800/70 hover:border-red-500 hover:bg-red-500/5"
                  }`}
                  onClick={() => setFormData({ ...formData, companyType: type.id })}
                >
                  <div className="flex items-start">
                    <div className="flex items-center justify-center mt-1 mr-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all focus:outline-none focus:ring-0 ${
                          isSelected
                            ? "border-red-500 bg-red-500"
                            : "border-white hover:border-red-500"
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{type.title}</h3>
                      <p className="text-sm text-gray-300 leading-relaxed">{type.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </RegistrationPageLayout>
    </PageLayout>
  )
}
