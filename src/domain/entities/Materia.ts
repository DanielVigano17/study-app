import { Flashcard } from "./Flashcard"

export interface Materia{
    id: string
    titulo:string
    userId: string
    createdAt: Date
    image : string | null
    updatedAt: Date
    flashcards?: Flashcard[]
}