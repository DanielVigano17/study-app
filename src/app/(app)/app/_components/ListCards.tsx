"use client"
import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { listMateriasAction } from "../actions";
import { Button } from "@/components/ui/button";
import { AddCardDialog } from "./AddCardDialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
export default function ListCards({materias} : {materias : Materia[]}) {
  const [cards, setCards] = useState<Materia[]>(materias)
  const [filteredCards, setFilteredCards] = useState<Materia[]>(cards)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    filtrar(query)
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
       <>
        <div className="w-full flex justify-between mb-4">
                <Input value={searchQuery} onChange={handleSearch} className="max-w-sm" type="text" placeholder="Pesquisar Matéria"/>
                <AddCardDialog onAddMateria={handleAddCard}/>
              </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.map((materia) => (
            <Card key={materia.id} className="overflow-hidden flex flex-col">
              <CardHeader className="p-0">
                {/* <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-48 object-cover"
                /> */}
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-xl">{materia.titulo}</CardTitle>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button 
                  // onClick={() => handleCardClick(card.id)} 
                  className="w-full"
                >
                  Ver mais
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </>
    )
}