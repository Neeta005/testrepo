"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DashboardSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

// Sidebar items with image paths from public folder
const sidebarItems = [
  { icon: "/images/Frame (4).png", label: "My Home", active: true },
  { icon: "/images/Frame (1).png", label: "My Job Posted", active: false },
  { icon: "/images/Frame (2).png", label: "Company Profile", active: false },
  { icon: "/images/Frame (3).png", label: "Calendar", active: false },
  { icon: "/images/Group 1171276077.png", label: "Messages", active: false },
  { icon: "/images/Vector (3).png", label: "Settings", active: false },
]

export function DashboardSidebar({ collapsed, onToggle }: DashboardSidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-slate-800 border-r border-slate-700 transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="p-4 flex flex-col items-center md:items-start">
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            "text-white hover:bg-slate-700 mb-4",
            collapsed && "mx-auto"
          )}
        >
          <Image src="/images/Group 1000006404.png" alt="menu" width={24} height={24} />
        </Button>

        {/* Sidebar Items */}
        <nav className="space-y-2 w-full">
          {sidebarItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "secondary" : "ghost"}
              className={cn(
                "w-full flex items-center justify-start text-white hover:bg-slate-700",
                collapsed ? "justify-center px-0" : "px-4",
                item.active && "bg-red-900 hover:bg-red-700 border border-red-500"
              )}
            >
              <div className={cn(
                "relative flex-shrink-0",
                collapsed ? "w-6 h-6" : "w-8 h-8"
              )}>
                <Image src={item.icon} alt={item.label} fill className="object-contain" />
              </div>

              {!collapsed && <span className="ml-3">{item.label}</span>}
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  )
}
