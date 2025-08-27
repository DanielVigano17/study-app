export interface Pergunta {
    id : number
    pergunta : string
    opcoes : Opcao[]
}

export interface Opcao {
    id : string
    texto : string
    isCorreta : boolean
}

export interface Questionario {
    id : string
    nome: string
    perguntas : Pergunta[]
    dtUltimaRevisao : Date | null
    createdAt : Date
    updatedAt : Date
    materiaId : string
}