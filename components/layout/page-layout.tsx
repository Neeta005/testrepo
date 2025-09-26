import { Navigation } from "@/components/ui/navigation"
import type { ReactNode } from "react"

interface PageLayoutProps {
  children: ReactNode
  navigationItems: Array<{
    label: string
    href: string
    isActive?: boolean
  }>
}

export function PageLayout({ children, navigationItems }: PageLayoutProps) {
  const headerHeight = 96 // Tailwind h-24 = 24 * 4px = 96px

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navigation items={navigationItems} />
      </div>

      {/* Page Content with padding to avoid overlap */}
      <main style={{ paddingTop: `${headerHeight}px` }}>{children}</main>

      {/* Footer */}
    <footer className="mt-12 border-t border-slate-800 bg-slate-800/40 text-sm text-gray-400 relative">
  <div className="container mx-auto px-6 py-4 flex items-center">
    {/* Keep Terms + Privacy left side but with more left spacing */}
    <div className="flex items-center space-x-2 ml-8">
      <span>you agree to our</span>
      <a href="#" className="text-blue-400 hover:underline">
        Terms of use
      </a>
      <span>,</span>
      <a href="#" className="text-blue-400 hover:underline">
        Privacy and policy
      </a>
    </div>

    {/* Centered Copyright */}
    <div className="absolute inset-x-0 text-center">
      © 2025 - Copyright:{" "}
      <span className="text-white">World of Interns</span>
    </div>
  </div>
</footer>

    </div>
  )
}
