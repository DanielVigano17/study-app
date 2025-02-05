import { Pergunta } from "../entities/Pergunta";

export interface CreatePerguntaDTO {
    acao : string
    resposta : string
    materiaId : string
}

export interface IPerguntaRepository{
    createPergunta : (data : CreatePerguntaDTO) => Promise<Pergunta>
    findManyPergunta : (materiaId : string) => Promise<Pergunta[]>
}