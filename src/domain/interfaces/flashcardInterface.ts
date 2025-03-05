import { Flashcard } from "../entities/Flashcard";

export interface CreateFlashcardDTO {
    acao : string
    resposta : string
    materiaId : string
}

export interface UpdateFlashcardDTO {
    acao? : string
    resposta? : string
    materiaId? : string
    facilidade? : number
    diasProximaRevisao? : number
    dtUltimaRevisao : Date | null
}

export interface IFlashcardRepository{
    createFlashcard : (data : CreateFlashcardDTO) => Promise<Flashcard>
    findManyFlashcard : (materiaId : string) => Promise<Flashcard[]>
    deleteFlashcard : (perguntaId : string) => Promise<Flashcard>
    update : (data : UpdateFlashcardDTO, id : string) => Promise<Flashcard>
}