import { Suspense } from "react"
import ListCards from "./_components/ListCards"
import { listMateriasAction } from "./actions"
import { auth } from "@/auth"
import { ApplicationPage } from "@/components/page-content/ApplicationPage"

export default async function ImageCards() {
  const user = await auth();
  let materias = listMateriasAction(user?.user?.id!);

  return (
    <ApplicationPage pageKey="home-page">
        <Suspense fallback={<p>Carregando...</p>}>
          <ListCards getMaterias={materias}/>
        </Suspense>
    </ApplicationPage>
  )
}

