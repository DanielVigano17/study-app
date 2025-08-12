import { z } from "zod";

export interface GerarRespostaDTO {
    pergunta : string
}

interface GerarListaPerguntaDTO {
    prompt : string
    dificuldade : string
    quantidade : number
}

export const OptionSchema = z.object({
    id: z.string(),
    text: z.string(),
    correct: z.boolean()
  });
  
  export const QuestionSchema = z.object({
    id: z.number(),
    question: z.string(),
    options: z.array(OptionSchema),
  });

  export const QuestionListSchema = z.object({
    nome : z.string(),
    questions : z.array(QuestionSchema)
  });

export type Perguntas = z.infer<typeof QuestionSchema>;
export type ListaPerguntas = z.infer<typeof QuestionListSchema>;


export interface IAiReposository{
    gerarRespostaFlashcard : (data : GerarRespostaDTO) => Promise<string>;
    gerarPergunta : (data : GerarListaPerguntaDTO) => Promise<ListaPerguntas>;
}