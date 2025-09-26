"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { RegistrationPageLayout } from "@/components/layout/registration-page-layout"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { InteractiveMap } from "@/components/ui/interactive-map"
import { recruiterNavigationItems } from "@/lib/data"
import { setRecruiterStepComplete, calcRecruiterProgressPercent } from "@/lib/progress"

interface Location {
  lat: number
  lng: number
  address: string
}

export default function CompanyAddressPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    addressLine1: "Mumbai, Maharashtra, India",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  })

  // Required fields for progress
  const requiredFields: (keyof typeof formData)[] = ["addressLine1", "city", "state", "country", "pinCode"]
  const allFilled = requiredFields.every((key) => {
    const v = formData[key]
    if (typeof v === "string") return v.trim().length > 0
    return !!v
  })
  if (typeof window !== "undefined") {
    setRecruiterStepComplete("companyAddress", allFilled)
  }
  const percent = typeof window !== "undefined" ? calcRecruiterProgressPercent() : 0

  const handleLocationSelect = (location: Location) => {
    setFormData((prev) => ({
      ...prev,
      addressLine1: location.address,
    }))
  }

  const handleClearField = (field: keyof typeof formData) => {
    setFormData((prev) => ({ ...prev, [field]: "" }))
  }

  return (
    <PageLayout navigationItems={recruiterNavigationItems}>
      <RegistrationPageLayout
        title="Register"
        nextHref="/recruiter/register/recruiter-info"
        currentStep={3}
        completionPercentage={percent}
      >
        <div className="space-y-8 rounded-xl p-2 min-h-[450px]">
          {/* Map Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Google Map</h3>
            <div className="relative border rounded-xl overflow-hidden" style={{ height: "350px" }}>
              {/* Search Bar inside map */}
              <div className="absolute top-3 left-3 z-10 w-[250px]">
                <Input
                  placeholder="Search location..."
                  value={formData.addressLine1}
                  onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                  className="h-12"
                />
              </div>

              {/* Map Component */}
              <InteractiveMap
                initialLocationName={formData.addressLine1 || "Mumbai"}
                onLocationSelect={handleLocationSelect}
                className="h-full w-full"
              />
            </div>
          </div>

          {/* Company Address Form */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Company Address (Regional/Headquarters)</h3>

            <div className="space-y-6">
              {/* Address Line 1 */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Address Line 1</label>
                <Input
                  value={formData.addressLine1}
                  onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                  className="h-12"
                />
              </div>

              {/* City and State Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">City</label>
                  <div className="relative">
                    <Input
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="h-12 pr-14"
                    />
                    <button
                      onClick={() => handleClearField("city")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center text-white text-sm transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">State</label>
                  <div className="relative">
                    <Input
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="h-12 pr-14"
                    />
                    <button
                      onClick={() => handleClearField("state")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center text-white text-sm transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>

              {/* Country (using Select) and Pin Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Country</label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData({ ...formData, country: value })}
                  >
                    <SelectTrigger className="h-12 w-full">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="USA">USA</SelectItem>
                      <SelectItem value="UK">UK</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Pin Code</label>
                  <Input
                    value={formData.pinCode}
                    onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                    className="h-12"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </RegistrationPageLayout>
    </PageLayout>
  )
}
