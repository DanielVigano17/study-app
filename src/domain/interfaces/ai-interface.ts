import Pergunta from "./Pergunta";

export interface GerarRespostaDTO {
    pergunta : string
}

export interface GerarListaPerguntaDTO {
    prompt : string
    dificuldade : string
    quantidade : number
}

export interface GerarFlashcardPDFDTO {
    urlPDF : string
}

export interface IAiReposository{
    gerarRespostaFlashcard : (data : GerarRespostaDTO) => Promise<string>;
    gerarPergunta : (data : GerarListaPerguntaDTO) => Promise<Pergunta[]>;
    gerarFlashcardPDF : (data : GerarFlashcardPDFDTO) => Promise<string>;
}