export function CandidateDashboardContent() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Candidate Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Completion</h2>
          <div className="text-3xl font-bold text-green-400">85%</div>
          <p className="text-gray-400 text-sm mt-2">Complete your profile to get better matches</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Applications</h2>
          <div className="text-3xl font-bold text-blue-400">12</div>
          <p className="text-gray-400 text-sm mt-2">Active job applications</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Messages</h2>
          <div className="text-3xl font-bold text-yellow-400">5</div>
          <p className="text-gray-400 text-sm mt-2">Unread messages from recruiters</p>
        </div>
      </div>
    </div>
  )
}
