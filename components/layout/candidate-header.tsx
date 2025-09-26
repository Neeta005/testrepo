import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"

interface CandidateHeaderProps {
  userProfile?: {
    name: string
    avatar: string
  }
}

export function CandidateHeader({ userProfile }: CandidateHeaderProps) {
  const candidateNavItems = [
    { label: "Dashboard", href: "/candidate/dashboard" },
    { label: "Jobs", href: "/candidate/jobs" },
    { label: "Applications", href: "/candidate/applications" },
    { label: "Messages", href: "/candidate/messages" },
    { label: "Profile", href: "/candidate/profile" },
  ]

  return (
    <nav className="flex items-center justify-between p-1.4 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
      <Logo />

      <div className="hidden md:flex items-center space-x-8">
        {candidateNavItems.map((item) => (
          <Link key={item.href} href={item.href} className="text-gray-300 hover:text-white transition-colors">
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {userProfile ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-sm">👤</span>
            </div>
            <span className="text-white text-sm">{userProfile.name}</span>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              Logout
            </Button>
          </div>
        ) : (
          <Button variant="ghost" className="text-blue-500 hover:text-blue-400">
            Login
          </Button>
        )}
      </div>
    </nav>
  )
}
