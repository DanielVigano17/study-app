import clientOpenAi from "@/lib/open-ai-client";
import {z} from 'zod';
import { zodResponseFormat } from "openai/helpers/zod";

interface PerguntaParams {
    prompt : string
    dificuldade : string
    quantidade : number
}

export const OptionSchema = z.object({
    id: z.string(),
    text: z.string(),
    correct: z.boolean().optional(), // Opcional, pois nem todas as opções terão essa propriedade
  });
  
  export const QuestionSchema = z.object({
    id: z.number(),
    question: z.string(),
    options: z.array(OptionSchema),
  });

  export const QuestionListSchema = z.object({
    questions : z.array(QuestionSchema)
  });

export type Perguntas = z.infer<typeof QuestionSchema>;
export type ListaPerguntas = z.infer<typeof QuestionListSchema>;

export default class AiService {
   static async gerarPergunta(paramsPergunta : PerguntaParams) : Promise<ListaPerguntas>{
    
    try{
        const completion = await clientOpenAi.beta.chat.completions.parse({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: `Você é um assistende de estudos que foca em gerar questionários de temas determinado pelos usuários. O questionários não pode ter alternativas iguais e
                    deve ter somente ${paramsPergunta.quantidade} perguntas. Além disso as perguntas devem ser ${paramsPergunta.dificuldade}` },
                {
                    role: "user",
                    content: paramsPergunta.prompt,
                },
            ],
            response_format : zodResponseFormat(QuestionListSchema, "questions")
        });

        const response = completion.choices[0].message.parsed

        return response ? response : {
            questions : []
        };

    }catch(e){
        console.log(e);
        return {
            questions : []
        };
    }
   }

}