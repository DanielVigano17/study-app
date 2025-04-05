import { Suspense } from "react"
import ListCards from "./_components/ListCards"
import { listMateriasAction } from "./actions"
import { auth } from "@/auth"
import { AnimatedPage } from "@/components/ui/animated-page"

export default async function ImageCards() {
  const user = await auth();
  let materias = listMateriasAction(user?.user?.id!);

  return (
    <AnimatedPage pageKey="home-page">
      <div className="w-full overflow-y-auto">
        <div className="container mx-auto py-8 px-8 h-screen overflow-y-visible">
          <Suspense fallback={<p>Carregando...</p>}>
            <ListCards getMaterias={materias}/>
          </Suspense>
        </div>
      </div>
    </AnimatedPage>
  )
}

