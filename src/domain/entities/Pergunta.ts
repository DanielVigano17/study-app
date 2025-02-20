export interface Pergunta {
    id : string
    acao : string
    resposta: string
    materiaId : string
    facilidade : number
    diasProximaRevisao : number
    dtUltimaRevisao : Date | null
    createdAt : Date
    updatedAt : Date
}