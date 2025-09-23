import { Questionario } from "@/domain/entities/Questionario"
import { TrilhaEstudos } from "@/domain/entities/TrilhaEstudos"
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

export interface GerarTrilhaEstudosDTO {
    materia: string
    descricaoAdicional: string
    nivel: string
    duracao: string
}

export interface IAiReposository{
    gerarRespostaFlashcard : (data : GerarRespostaDTO) => Promise<string>;
    gerarPergunta : (data : GerarListaPerguntaDTO) => Promise<Questionario>;
    gerarFlashcardPDF : (data : GerarFlashcardPDFDTO) => Promise<string>;
    gerarQuestionarioByPDF : (data : GerarQuestionarioPDFDTO) => Promise<Questionario>;
    gerarTrilhaEstudos : (data : GerarTrilhaEstudosDTO) => Promise<TrilhaEstudos>;
}