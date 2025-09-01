import { FlashCard } from "@/app/(app)/app/cards/[materiaId]/_components/FlashCard";
import { GerarFlashcardPDFDTO, GerarListaPerguntaDTO, GerarQuestionarioPDFDTO, GerarRespostaDTO, IAiReposository } from "../domain/interfaces/ai-interface";
import Pergunta from "../domain/interfaces/pergunta";
import { GoogleGenAI, Type } from "@google/genai";
import { Questionario } from "@/domain/entities/Questionario";

export default class GeminiRepository implements IAiReposository {

    private readonly geminiClient : GoogleGenAI

    constructor(){
        this.geminiClient = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY})
    }

    async gerarRespostaFlashcard(data: GerarRespostaDTO): Promise<string> {
        const contents = [
            { role: "system", 
              text: `Você é um assistente especializado em criar respostas concisas e objetivas para flashcards. Mantenha as respostas curtas e diretas.` 
            },
            {
                role: "user",
                text: `Crie uma resposta objetiva para o seguinte flashcard: ${data.pergunta}`,
            }
        ];

        const response = await this.geminiClient.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config : {
                responseMimeType: "application/json",
                responseSchema : {
                    type: Type.STRING,
                }
            }
        });
        
        return response.text || '';

    }
    async gerarPergunta(data: GerarListaPerguntaDTO): Promise<Questionario> {

        const contents = [
            { role: "system", 
              text: `Você é um assistende de estudos que foca em gerar questionários de temas determinado pelos usuários. O questionários não pode ter alternativas iguais e
                deve ter somente ${data.quantidade} perguntas. Além disso as perguntas devem ser ${data.dificuldade}` 
            },
            {
                role: "user",
                text: data.prompt,
            }
        ];    
        
        const response = await this.geminiClient.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config : {
                responseMimeType: "application/json",
                responseSchema : {
                    type: Type.OBJECT,
                    properties :{
                        nome : {
                            type: Type.STRING,
                        },
                        questions : {
                            type: Type.ARRAY,
                            items : {
                                type : Type.OBJECT,
                                properties : {
                                    id : {
                                        type : Type.STRING,
                                    },
                                    pergunta : {
                                        type : Type.STRING,
                                    },
                                    opcoes : {
                                        type : Type.ARRAY,
                                        items : {
                                            type : Type.OBJECT,
                                            properties : {
                                                id : {
                                                    type : Type.STRING,
                                                },
                                                texto : {
                                                    type : Type.STRING,
                                                },
                                                isCorreta : {
                                                    type : Type.BOOLEAN,
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        return this.desserializarPerguntasQuestionario(response.text || '');
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

    async gerarQuestionarioByPDF(data: GerarQuestionarioPDFDTO): Promise<Questionario> {
        
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
                    type: Type.OBJECT,
                    properties :{
                        nome : {
                            type: Type.STRING,
                        },
                        questions : {
                            type: Type.ARRAY,
                            items : {
                                type : Type.OBJECT,
                                properties : {
                                    id : {
                                        type : Type.STRING,
                                    },
                                    pergunta : {
                                        type : Type.STRING,
                                    },
                                    opcoes : {
                                        type : Type.ARRAY,
                                        items : {
                                            type : Type.OBJECT,
                                            properties : {
                                                id : {
                                                    type : Type.STRING,
                                                },
                                                texto : {
                                                    type : Type.STRING,
                                                },
                                                isCorreta : {
                                                    type : Type.BOOLEAN,
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        return this.desserializarPerguntasQuestionario(response.text || '');
    }

    /////////////////////////// métodos privados /////////////////////////////////////

    private async desserializarPerguntasQuestionario(response : string) : Promise<Questionario> {
        const responseJson = JSON.parse(response);

        const questionario : Questionario = {
            id : "",
            nome : responseJson.nome as string,
            perguntas : responseJson.questions,
            dtUltimaRevisao : new Date(),
            materiaId : "",
            createdAt : new Date(),
            updatedAt : new Date()
        }

        return questionario;
    }

    
}