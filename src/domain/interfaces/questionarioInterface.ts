import { Pergunta, Questionario } from "../entities/Questionario";

export interface CreateQuestionarioDTO {
    nome : string
    perguntas : Pergunta[]
    materiaId : string
}


export interface IQuestionarioRepository{
    createQuestionario : (data : CreateQuestionarioDTO) => Promise<Questionario>
    listQuestionariosByMateriaId : (materiaId : string) => Promise<Questionario[]>
    getById: (id: string) => Promise<Questionario | null>
    deleteQuestionario: (id: string) => Promise<Questionario | null>
}