import { ListaPerguntas } from "@/services/ai-service";
import { Flashcard } from "../entities/Flashcard";
import { Questionario } from "../entities/Questionario";

export interface CreateQuestionarioDTO {
    perguntas : ListaPerguntas
    materiaId : string
}


export interface IQuestionarioRepository{
    createQuestionario : (data : CreateQuestionarioDTO) => Promise<Questionario>
    listQuestionariosByMateriaId : (materiaId : string) => Promise<Questionario[]>
    getById: (id: string) => Promise<Questionario | null>
}