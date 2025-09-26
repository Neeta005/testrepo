"use client"

import { StatsCards } from "./stats-cards"
import { ApplicationsChart } from "./applications-chart"
import { RecentJobs } from "./recent-jobs"
import { ActivityFeed } from "./activity-feed"
import { MeetingsSection } from "./meetings-section"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Welcome, Arun</h1>
        <Link href="/recruiter/post-job">
          <Button className=" bg-gradient-to-r from-pink-500 to-orange-500 hover:bg-red-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Post Job
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Applications Chart and Recent Jobs in Single Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ApplicationsChart />
        </div>
        <div>
          <RecentJobs />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed />
        <MeetingsSection />
      </div>
    </div>
  )
}
