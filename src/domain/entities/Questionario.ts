import { ListaPerguntas } from "@/services/ai-service"

export interface Questionario {
    id : string
    nome: string
    perguntas : ListaPerguntas
    dtUltimaRevisao : Date | null
    createdAt : Date
    updatedAt : Date
}