export interface Opcao {
    id : number
    texto : string
    correta : boolean
}

export default interface Pergunta {
    id : number
    pergunta : string
    opcoes : Opcao[]
}