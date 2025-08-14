import { GerarFlashcardPDFDTO, GerarListaPerguntaDTO, GerarRespostaDTO, IAiReposository } from "../domain/interfaces/ai-interface";
import Pergunta from "../domain/interfaces/Pergunta";
import { GoogleGenAI } from "@google/genai";

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
            { text: "Analise este pdf e retorne uma lista de perguntas e respostas" },
            {
                inlineData: {
                    mimeType: 'application/pdf',
                    data: Buffer.from(pdfResp).toString("base64")
                }
            }
        ];

        const response = await this.geminiClient.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents
        });

        return response.text || '';
    }

    /////////////////////////// métodos privados /////////////////////////////////////

    
}