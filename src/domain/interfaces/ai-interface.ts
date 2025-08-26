import Pergunta from "./pergunta"

export interface GerarRespostaDTO {
    pergunta : string
}

export interface GerarListaPerguntaDTO {
    prompt : string
    dificuldade : string
    quantidade : number
}

export interface GerarQuestionarioPDFDTO {
    urlPDF : string
    materiaId : string
}

export interface GerarFlashcardPDFDTO {
    urlPDF : string
    materiaId : string
}

export interface IAiReposository{
    gerarRespostaFlashcard : (data : GerarRespostaDTO) => Promise<string>;
    gerarPergunta : (data : GerarListaPerguntaDTO) => Promise<Pergunta[]>;
    gerarFlashcardPDF : (data : GerarFlashcardPDFDTO) => Promise<string>;
    gerarQuestionarioPDF : (data : GerarQuestionarioPDFDTO) => Promise<string>;
}