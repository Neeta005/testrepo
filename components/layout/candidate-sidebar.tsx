import Link from "next/link"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Briefcase, FileText, MessageSquare, User, Settings } from "lucide-react"

interface CandidateSidebarProps {
  className?: string
  isCollapsed?: boolean
}

export function CandidateSidebar({ className, isCollapsed = false }: CandidateSidebarProps) {
  const sidebarItems = [
    {
      label: "Dashboard",
      href: "/candidate/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      label: "Browse Jobs",
      href: "/candidate/jobs",
      icon: Briefcase,
    },
    {
      label: "Applications",
      href: "/candidate/applications",
      icon: FileText,
    },
    {
      label: "Messages",
      href: "/candidate/messages",
      icon: MessageSquare,
    },
    {
      label: "Profile",
      href: "/candidate/profile",
      icon: User,
    },
    {
      label: "Settings",
      href: "/candidate/settings",
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
        <h2 className={cn("font-semibold text-blue-400", isCollapsed ? "text-center text-xs" : "text-lg")}>
          {isCollapsed ? "C" : "Candidate"}
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
                  ? "bg-blue-600/20 text-blue-400 border border-blue-600/30"
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
    </div>
  )
}
