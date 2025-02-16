"use client"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { AddCardDialog } from "./AddCardDialog";
import { Input } from "@/components/ui/input";
import { use, useState } from "react";
import { Materia } from "@/domain/entities/Materia";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import { deleteMateriaAction } from "../actions";

export default function ListCards({getMaterias} : {getMaterias : Promise<Materia[]>}) {
  const materias = use(getMaterias);
  const [cards, setCards] = useState<Materia[]>(materias)
  const [filteredCards, setFilteredCards] = useState<Materia[]>(cards)
  const [searchQuery, setSearchQuery] = useState('')

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
      console.log(cardsSemExcluido);
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
          <div className="grid grid-cols-1 pb-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.map((materia) => (
            <Card key={materia.id} className="overflow-hidden flex flex-col">
              <CardHeader className="p-0">
                {<img
                  src={materia.image || "/placeholder_image.svg"}
                  alt={materia.titulo}
                  className="w-full h-48 object-cover"
                />
                }
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-xl break-words">{materia.titulo}</CardTitle>
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
      </div>
    )
}
