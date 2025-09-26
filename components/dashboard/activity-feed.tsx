"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function ActivityFeed() {
  const activities = [
    {
      user: "Marvin McKinney",
      action: "applied for the job",
      job: "Product Designer",
      time: "2 mins ago",
      status: "Applying",
      avatar: "/placeholder-zxyz7.png",
    },
    {
      user: "Jane Cooper",
      action: "Created new Account on",
      job: "Job Hunt",
      time: "3 hours ago",
      status: "Sign Up",
      avatar: "/jane-portrait.png",
    },
    {
      user: "Jenny Wilson",
      action: "applied for the job",
      job: "Frontend Engineer",
      time: "5 hours ago",
      status: "Applying",
      avatar: "/jenny.jpg",
    },
  ]

  return (
    <Card className="bg-slate-800 border-slate-700 h-[350px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-white text-lg">Activity Feed</CardTitle>
        <Button variant="outline" size="sm" className="border-slate-600 text-gray-300 bg-transparent h-8">
          All Activity <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className=" p-4 space-y-1">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-3 py-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src={activity.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-xs">{activity.user.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm leading-tight">
                <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                <span className="font-medium">{activity.job}</span>
              </p>
              <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
            </div>
            <Button
              size="sm"
              className={`text-xs h-7 px-3 ${
                activity.status === "Applying" 
                  ? "bg-blue-600/20 hover:bg-blue-700" 
                  : "bg-emerald-600/20 hover:bg-emerald-700"
              }`}
            >
              {activity.status}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
