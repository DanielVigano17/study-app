import { FlashCard } from "@/app/(app)/app/cards/[materiaId]/_components/FlashCard";
import { GerarFlashcardPDFDTO, GerarListaPerguntaDTO, GerarQuestionarioPDFDTO, GerarRespostaDTO, IAiReposository } from "../domain/interfaces/ai-interface";
import Pergunta from "../domain/interfaces/pergunta";
import { GoogleGenAI, Type } from "@google/genai";

export default class GeminiRepository implements IAiReposository {

    private readonly geminiClient : GoogleGenAI

    constructor(){
        this.geminiClient = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY})
    }

    async gerarRespostaFlashcard(data: GerarRespostaDTO): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async gerarPergunta(data: GerarListaPerguntaDTO): Promise<Pergunta[]> {
        throw new Error("Method not implemented.");
    }
    async gerarFlashcardPDF(data: GerarFlashcardPDFDTO): Promise<string> {
        
        const pdfResp = await fetch(data.urlPDF)
        .then((response) => response.arrayBuffer());

        const contents = [
            {
                role: "system",
                text: "Você é um assistente especializado em criar flashcards a partir de pdfs. Mantenha as respostas curtas e diretas."
            },
            { 
                role: "user",
                text: "Analise este pdf e retorne uma lista de 10 flashcards" 
            },
            {
                inlineData: {
                    mimeType: 'application/pdf',
                    data: Buffer.from(pdfResp).toString("base64")
                }
            }
        ];

        const response = await this.geminiClient.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config : {
                responseMimeType: "application/json",
                responseSchema : {
                    type: Type.ARRAY,
                    items:{
                        type: Type.OBJECT,
                        properties :{
                            acao : {
                                type: Type.STRING,
                            },
                            resposta :{
                                type : Type.STRING
                            }
                        }
                    }
                }
            }
        });

        return response.text || '';
    }

    async gerarQuestionarioPDF(data: GerarQuestionarioPDFDTO): Promise<string> {
        
        const pdfResp = await fetch(data.urlPDF)
        .then((response) => response.arrayBuffer());

        const contents = [
            {
                role: "system",
                text: "Você é um assistente especializado em criar questionários a partir de pdfs. Mantenha as respostas curtas e diretas."
            },
            {
                role: "user",
                text: "Analise este pdf e retorne uma lista de 10 perguntas"
            },
            {
                inlineData: {
                    mimeType: 'application/pdf',
                    data: Buffer.from(pdfResp).toString("base64")
                }
            }
        ];

        const response = await this.geminiClient.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config : {
                responseMimeType: "application/json",
                responseSchema : {
                    type: Type.ARRAY,
                    items:{
                        type: Type.OBJECT,
                        properties :{
                            pergunta : {
                                type: Type.STRING,
                            },
                            opcoes : {
                                type: Type.ARRAY,
                                items:{
                                    type: Type.OBJECT,
                                    properties :{
                                        opcao : {
                                            type: Type.STRING,
                                        },
                                        correta : {
                                            type: Type.BOOLEAN,
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        return response.text || '';
    }

    /////////////////////////// métodos privados /////////////////////////////////////

    
}