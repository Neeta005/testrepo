// components/ui/navigation.tsx
"use client"

import Link from "next/link"
import { Button } from "./button"
import { Logo } from "./logo"
import { Bell } from "lucide-react"

interface NavigationItem {
  label: string
  href: string
}

interface NavigationProps {
  items: NavigationItem[]
  userProfile?: {
    name: string
    avatar?: string
  }
}

export function Navigation({ items, userProfile }: NavigationProps) {
  return (
    <nav className="fixed top-0 w-full z-50 h-16 flex items-center px-6 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700/50">
      {/* Logo */}
      <div className="flex items-center">
        <Logo />
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8 ml-12">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-gray-300 hover:text-white font-medium transition-colors duration-200 relative group"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-300 hover:text-white transition-colors duration-200 hover:bg-slate-700/50 rounded-lg">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            {userProfile?.avatar ? (
              <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-sm font-medium">
                {userProfile?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-white text-sm font-medium">{userProfile?.name || "User"}</span>
            <span className="text-gray-400 text-xs">Profile</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
