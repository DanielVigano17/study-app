import { Suspense } from "react"
import { auth } from "../../../../../auth/auth"
import { ApplicationPage } from "@/components/page-content/ApplicationPage"
import { StudyTrailGenerator } from "./_components/StudyTrailGenerator"

export default async function StudyTrailsPage() {
  const user = await auth();

  return (
    <ApplicationPage pageKey="study-trails-page" authPage subscriptionRequired >
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Trilhas de Estudos com IA
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gere trilhas de estudos personalizadas com inteligência artificial para qualquer matéria
          </p>
        </div>
        
        <Suspense fallback={<p>Carregando...</p>}>
          <StudyTrailGenerator userId={user?.user?.id!} subscriptionId={user?.user?.subscriptionId!} />
        </Suspense>
      </div>
    </ApplicationPage>
  )
}
