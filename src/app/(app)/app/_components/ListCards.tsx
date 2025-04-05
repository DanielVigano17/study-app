"use client"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { AddCardDialog } from "./AddCardDialog";
import { Input } from "@/components/ui/input";
import { use, useState, useEffect } from "react";
import { Materia } from "@/domain/entities/Materia";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Trash2, AlertCircle } from "lucide-react";
import { deleteMateriaAction } from "../actions";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Flashcard } from "@/domain/entities/Flashcard";
type MateriaWithPendente = Materia & {
  flashcardPendente?: boolean;
};

const checkIsPendente = (flashcard : Flashcard) : boolean => {
  const dataUltimaRevisao = flashcard.dtUltimaRevisao ? new Date(flashcard.dtUltimaRevisao) : null;
      
  if (!dataUltimaRevisao) return true;

  // Adiciona os dias da próxima revisão à data da última revisão
  const dataProximaRevisao = new Date(dataUltimaRevisao);
  dataProximaRevisao.setDate(dataProximaRevisao.getDate() + flashcard.diasProximaRevisao);

  // Compara com a data atual
  return dataProximaRevisao <= new Date() ? true : false;
}

export default function ListCards({getMaterias} : {getMaterias : Promise<MateriaWithPendente[]>}) {
  const materias = use(getMaterias);

  const materiasWithStatus = materias.map(materia => ({
    ...materia,
    flashcardPendente: materia.flashcards?.some(flashcard => checkIsPendente(flashcard)),
  }));

  const [cards, setCards] = useState<MateriaWithPendente[]>(materiasWithStatus)
  const [filteredCards, setFilteredCards] = useState<MateriaWithPendente[]>(cards)
  const [searchQuery, setSearchQuery] = useState('')
  const { theme } = useTheme()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    filtrar(query)
  }

  const handleClickDelete = async (id : string) => {
    const materiaExcluida = await deleteMateriaAction(id);

    if(materiaExcluida){
      const cardsSemExcluido = cards.filter(item => item.id != materiaExcluida.id);
      setCards(cardsSemExcluido);
      setFilteredCards(cardsSemExcluido);
    }
    
  }

  const handleAddCard = (materia : Materia) => {
    const addedCards = [...cards,materia]
    setCards(addedCards);
    setFilteredCards(addedCards);
  }
  
  const filtrar = (query : string) =>{
    const filtrado = cards.filter( card => {
      return card.titulo.toLowerCase().includes(query.toLowerCase());
    });

    setFilteredCards(filtrado);
  }
  
  return (
    <div className="">
      <div className="w-full flex justify-between gap-3 mb-4">
        <Input value={searchQuery} onChange={handleSearch} className="max-w-sm" type="text" placeholder="Pesquisar Matéria"/>
        <AddCardDialog onAddMateria={handleAddCard}/>
      </div>
      {filteredCards.length === 0 ? (
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <p className="text-gray-500 text-lg text-center">Nenhuma matéria encontrada. Adicione uma nova matéria clicando no botão acima.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 pb-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.map((materia) => (
            <Card key={materia.id} className="overflow-hidden flex flex-col">
              <CardHeader className="p-0">
                <img
                  src={materia.image || "/placeholder_image.svg"}
                  alt={materia.titulo}
                  className={cn(
                    "w-full h-48 object-cover transition-all",
                    theme === "dark" && "brightness-[0.8] contrast-[1.2]"
                  )}
                />
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <div className="flex items-center">
                  <CardTitle className="text-xl break-words">{materia.titulo}</CardTitle>
                  {materia.flashcardPendente && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AlertCircle className="w-5 h-5 text-red-500 animate-pulse ml-2 flex-shrink-0" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Existem flashcards pendentes para revisão</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Link className="w-full" href={`/app/flashcards/${materia.id}`}>
                  <Button className="w-full">
                    Ver mais
                  </Button>
                </Link>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={()=>{
                          handleClickDelete(materia.id);
                        }}
                        className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-600 transition-colors
                        w-12"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
