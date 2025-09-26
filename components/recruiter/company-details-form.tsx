"use client"

interface CompanyDetailsFormProps {
  companyName: string
  companySize: string
  aboutUs: string
  onCompanyNameChange: (name: string) => void
  onCompanySizeChange: (size: string) => void
  onAboutUsChange: (aboutUs: string) => void
}

export function CompanyDetailsForm({
  companyName,
  companySize,
  aboutUs,
  onCompanyNameChange,
  onCompanySizeChange,
  onAboutUsChange,
}: CompanyDetailsFormProps) {
  return (
    <div className="space-y-6">
      {/* Company Name */}
      <div>
        <label className="block text-white text-sm font-medium mb-3">Company Name</label>
        <div className="relative">
          <input
            type="text"
            value={companyName}
            onChange={(e) => onCompanyNameChange(e.target.value)}
            className="w-full border border-gray-600 bg-gray-800 text-white rounded-lg px-4 py-3 pr-12 text-base focus:outline-none focus:border-red-400"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Company Size */}
      <div>
        <label className="block text-white text-sm font-medium mb-3">Company Size</label>
        <div className="relative">
          <select
            value={companySize}
            onChange={(e) => onCompanySizeChange(e.target.value)}
            className="w-full border border-gray-600 bg-gray-800 text-white rounded-lg px-4 py-3 pr-12 text-base appearance-none focus:outline-none focus:border-red-400 cursor-pointer"
          >
            <option value="Software company">Software company</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="500+">500+ employees</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
