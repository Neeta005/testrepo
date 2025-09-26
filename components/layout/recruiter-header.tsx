import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"

interface RecruiterHeaderProps {
  userProfile?: {
    name: string
    avatar: string
  }
}

export function RecruiterHeader({ userProfile }: RecruiterHeaderProps) {
  const recruiterNavItems = [
    { label: "Dashboard", href: "/recruiter/dashboard" },
    { label: "Candidates", href: "/recruiter/candidates" },
    { label: "Jobs", href: "/recruiter/jobs" },
    { label: "Messages", href: "/recruiter/messages" },
    { label: "Company", href: "/recruiter/company" },
  ]

  return (
<nav className="flex items-center justify-between h-15 px-6 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
      <Logo />

      <div className="hidden md:flex items-center space-x-8">
        {recruiterNavItems.map((item) => (
          <Link key={item.href} href={item.href} className="text-gray-300 hover:text-white transition-colors">
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {userProfile ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center">
              <span className="text-white text-sm">👤</span>
            </div>
            <span className="text-white text-sm">{userProfile.name}</span>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              Logout
            </Button>
          </div>
        ) : (
          <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
            Post An Internship
          </Button>
        )}
      </div>
    </nav>
  )
}
