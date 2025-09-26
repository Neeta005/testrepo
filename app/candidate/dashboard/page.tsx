import { CandidateLayout } from "@/components/layout/candidate-layout"
import { CandidateDashboardContent } from "@/components/pages/candidate/candidate-dashboard-content"

export default function CandidateDashboardPage() {
  return (
    <CandidateLayout userProfile={{ name: "John Doe", avatar: "" }}>
      <CandidateDashboardContent />
    </CandidateLayout>
  )
}
