
import { Suspense } from "react"
import ListCards from "./_components/ListCards"
import { listMateriasAction } from "./actions"
import { auth } from "@/auth"

export default async function ImageCards() {
  const user = await auth();
  let materias = await listMateriasAction(user?.user?.id);
  
  if(!materias) materias = [];

  return (
    <div className="container mx-auto py-8 px-8">
      <Suspense fallback={<p>Carregando...</p>}>
        <ListCards materias={materias}/>
      </Suspense>

    </div>
  )
}

