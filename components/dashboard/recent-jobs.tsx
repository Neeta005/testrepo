"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentJobs() {
  const jobs = [
    {
      title: "Jr. Frontend Engineer",
      company: "Spotify, Singapore",
      time: "2 Days ago",
      avatar: "/spotify-app-interface.png",
    },
    {
      title: "Product Designer",
      company: "Spotify, Singapore",
      time: "6 hours ago",
      avatar: "/diverse-products-still-life.png",
    },
    {
      title: "iOS Developer",
      company: "San Francisco, CA",
      time: "2 Days ago",
      avatar: "/ios.jpg",
    },
    {
      title: "Brand Strategist",
      company: "New York, US",
      time: "2 Days ago",
      avatar: "/brand-concept.png",
    },
  ]

  return (
    <Card className="bg-slate-800 border-slate-700 h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-lg font-semibold">Recent Added Jobs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 h-80 overflow-y-auto">
        {jobs.map((job, index) => (
          <div key={index} className="flex items-center space-x-3 p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={job.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-slate-600 text-white text-sm">
                {job.title.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{job.title}</p>
              <p className="text-gray-400 text-sm truncate">
                {job.company} • {job.time}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
