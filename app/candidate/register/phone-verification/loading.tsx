import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <Skeleton className="h-8 w-48 mx-auto bg-white/10" />
          <Skeleton className="h-4 w-64 mx-auto bg-white/10" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-4 w-24 bg-white/10" />
          <Skeleton className="h-12 w-full bg-white/10" />
        </div>

        <Skeleton className="h-12 w-full bg-white/10" />
      </div>
    </div>
  )
}
