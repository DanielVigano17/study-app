import { Pergunta } from "../entities/Pergunta";

export interface CreatePerguntaDTO {
    acao : string
    resposta : string
    materiaId : string
}

export interface UpdatePerguntaDTO {
    acao? : string
    resposta? : string
    materiaId? : string
    facilidade? : number
    diasProximaRevisao? : number
    dtUltimaRevisao : Date | null
}

export interface IPerguntaRepository{
    createPergunta : (data : CreatePerguntaDTO) => Promise<Pergunta>
    findManyPergunta : (materiaId : string) => Promise<Pergunta[]>
    deletePergunta : (perguntaId : string) => Promise<Pergunta>
    update : (data : UpdatePerguntaDTO, id : string) => Promise<Pergunta>
}