import { Suspense } from "react"
import ListCards from "./_components/ListCards"
import { listMateriasAction } from "./actions"
import { auth } from "@/auth"

export default async function ImageCards() {
  const user = await auth();
  let materias = listMateriasAction(user?.user?.id!);

  return (
    <div className="container mx-auto py-8 px-8 h-screen overflow-y-auto">
      <Suspense fallback={<p>Carregando...</p>}>
        <ListCards getMaterias={materias}/>
      </Suspense>
    </div>
  )
}

