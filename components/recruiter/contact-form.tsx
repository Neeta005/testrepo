"use client"

interface ContactFormProps {
  fullName: string
  email: string
  mobile: string
  onFullNameChange: (name: string) => void
  onEmailChange: (email: string) => void
  onMobileChange: (mobile: string) => void
}

export function ContactForm({
  fullName,
  email,
  mobile,
  onFullNameChange,
  onEmailChange,
  onMobileChange,
}: ContactFormProps) {
  const inputClasses =
    "bg-slate-900 border border-white text-white placeholder:text-gray-400 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-red-500 focus:ring-0 w-full transition-colors"

  return (
    <div className="space-y-6">
      {/* Full Name + Email Row */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Full Name */}
        <div className="flex-1">
          <label className="block text-white text-sm font-medium mb-3">Full Name</label>
          <input
            placeholder="Text field"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            className={inputClasses}
          />
        </div>

        {/* Email */}
        <div className="flex-1">
          <label className="block text-white text-sm font-medium mb-3">Email Id</label>
          <input
            type="email"
            placeholder="ex@ex.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      {/* Mobile Number */}
      <div>
        <label className="block text-white text-sm font-medium mb-3">Mobile Number</label>
        <div className="flex gap-2 items-center">
          <input
            placeholder="+91  Enter your 10-digit number"
            value={mobile}
            onChange={(e) => onMobileChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
            className={`${inputClasses} flex-1`}
          />
          {mobile.length === 10 && (
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
