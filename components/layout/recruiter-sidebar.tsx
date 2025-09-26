import Link from "next/link"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Briefcase, MessageSquare, Building, Settings, Plus } from "lucide-react"

interface RecruiterSidebarProps {
  className?: string
  isCollapsed?: boolean
}

export function RecruiterSidebar({ className, isCollapsed = false }: RecruiterSidebarProps) {
  const sidebarItems = [
    {
      label: "Dashboard",
      href: "/recruiter/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      label: "Candidates",
      href: "/recruiter/candidates",
      icon: Users,
    },
    {
      label: "Job Postings",
      href: "/recruiter/jobs",
      icon: Briefcase,
    },
    {
      label: "Messages",
      href: "/recruiter/messages",
      icon: MessageSquare,
    },
    {
      label: "Company",
      href: "/recruiter/company",
      icon: Building,
    },
    {
      label: "Settings",
      href: "/recruiter/settings",
      icon: Settings,
    },
  ]

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-slate-800/50 backdrop-blur-sm border-r border-slate-700",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div className="p-4">
        <h2 className={cn("font-semibold text-orange-400", isCollapsed ? "text-center text-xs" : "text-lg")}>
          {isCollapsed ? "R" : "Recruiter"}
        </h2>
      </div>

      <nav className="flex-1 px-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors",
                item.isActive
                  ? "bg-orange-600/20 text-orange-400 border border-orange-600/30"
                  : "text-gray-400 hover:text-white hover:bg-slate-700/50",
                isCollapsed && "justify-center",
              )}
            >
              <Icon className="w-5 h-5" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <Link
          href="/recruiter/jobs/new"
          className={cn(
            "flex items-center gap-2 w-full px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg text-white font-medium transition-colors",
            isCollapsed && "justify-center",
          )}
        >
          <Plus className="w-4 h-4" />
          {!isCollapsed && <span>Post Job</span>}
        </Link>
      </div>
    </div>
  )
}
