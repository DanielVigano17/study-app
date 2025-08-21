import { Suspense } from "react"
import ListCards from "./_components/ListCards"
import { listMateriasAction } from "./actions"
import { auth } from "../../../../auth/auth"
import { ApplicationPage } from "@/components/page-content/ApplicationPage"
import { modules } from "@/domain"

export default async function ImageCards() {
  const user = await auth();
  let materias = listMateriasAction(user?.user?.id!);

  // const flashcards = modules.useCase.ai.gerarFlashcardPDF.execute({
  //   urlPDF: "https://fasam.edu.br/wp-content/uploads/2020/07/Economia-Empresarial.pdf"
  // });

  return (
    <ApplicationPage pageKey="home-page" authPage subscriptionRequired >
        <Suspense fallback={<p>Carregando...</p>}>
          <ListCards getMaterias={materias}/>
        </Suspense>
    </ApplicationPage>
  )
}

