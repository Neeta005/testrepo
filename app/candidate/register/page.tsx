import { PageLayout } from "@/components/layout/page-layout"
import { CandidateRegisterContent } from "@/components/pages/candidate/candidate-register-content"
import { candidateNavigationItems } from "@/lib/data"

export default function CandidateRegisterPage() {
  return (
    <PageLayout navigationItems={candidateNavigationItems}>
      <CandidateRegisterContent />
    </PageLayout>
  )
}
