import { FlashCard } from "@/app/(app)/app/cards/[materiaId]/_components/FlashCard";
import { GerarFlashcardPDFDTO, GerarListaPerguntaDTO, GerarQuestionarioPDFDTO, GerarRespostaDTO, GerarTrilhaEstudosDTO, IAiReposository } from "../domain/interfaces/ai-interface";
import Pergunta from "../domain/interfaces/pergunta";
import { GoogleGenAI, Type } from "@google/genai";
import { Questionario } from "@/domain/entities/Questionario";
import { TrilhaEstudos } from "@/domain/entities/TrilhaEstudos";

export default class GeminiRepository implements IAiReposository {

    private readonly geminiClient : GoogleGenAI

    constructor(){
        if (!process.env.GEMINI_API_KEY) {
            console.error('GEMINI_API_KEY não está configurada');
            throw new Error('GEMINI_API_KEY não está configurada');
        }
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

    async gerarTrilhaEstudos(data: GerarTrilhaEstudosDTO): Promise<TrilhaEstudos> {
        try {
            console.log('Iniciando geração de trilha no Gemini para:', data.materia);
            
            const prompt = `Crie uma trilha de estudos completa e estruturada para a matéria "${data.materia}".

Informações adicionais: ${data.descricaoAdicional || 'Nenhuma informação adicional fornecida'}
Nível do estudante: ${data.nivel}
Duração desejada: ${data.duracao}

A trilha deve ser prática, bem estruturada e adequada ao nível especificado. Inclua:

1. Título atraente e descritivo
2. Descrição clara dos objetivos
3. Duração estimada total
4. Lista de objetivos de aprendizagem específicos
5. Pré-requisitos necessários (se houver)
6. Módulos organizados sequencialmente, cada um com:
   - Título descritivo
   - Descrição do que será aprendido
   - Duração estimada
   - Lista de tópicos principais
   - Recursos recomendados (livros, artigos, vídeos, etc.)
   - Atividades práticas e exercícios

Certifique-se de que:
- A trilha seja progressiva (do básico ao avançado)
- Os módulos tenham duração realística
- Os recursos sejam variados e acessíveis
- As atividades sejam práticas e relevantes
- O conteúdo seja adequado ao nível especificado`;

        const contents = [
            { 
                role: "system", 
                text: "Você é um especialista em educação e criação de trilhas de aprendizagem. Crie trilhas de estudos estruturadas, práticas e adequadas ao nível do estudante." 
            },
            {
                role: "user",
                text: prompt,
            }
        ];

            console.log('Enviando request para Gemini...');
            
            const response = await this.geminiClient.models.generateContent({
                model: "gemini-2.5-flash",
                contents: contents,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        titulo: {
                            type: Type.STRING,
                        },
                        descricao: {
                            type: Type.STRING,
                        },
                        duracaoEstimada: {
                            type: Type.STRING,
                        },
                        nivel: {
                            type: Type.STRING,
                        },
                        objetivos: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                            }
                        },
                        prerequisitos: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                            }
                        },
                        modulos: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    id: {
                                        type: Type.NUMBER,
                                    },
                                    titulo: {
                                        type: Type.STRING,
                                    },
                                    descricao: {
                                        type: Type.STRING,
                                    },
                                    duracaoEstimada: {
                                        type: Type.STRING,
                                    },
                                    topicos: {
                                        type: Type.ARRAY,
                                        items: {
                                            type: Type.STRING,
                                        }
                                    },
                                    recursos: {
                                        type: Type.ARRAY,
                                        items: {
                                            type: Type.STRING,
                                        }
                                    },
                                    atividades: {
                                        type: Type.ARRAY,
                                        items: {
                                            type: Type.STRING,
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

            return this.desserializarTrilhaEstudos(response.text || '');
        } catch (error) {
            console.error('Erro ao gerar trilha de estudos:', error);
            throw new Error('Erro ao gerar trilha de estudos com IA');
        }
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

    private async desserializarTrilhaEstudos(response: string): Promise<TrilhaEstudos> {
        try {
            if (!response || response.trim() === '') {
                throw new Error('Resposta vazia da IA');
            }

            const responseJson = JSON.parse(response);

            const trilhaEstudos: TrilhaEstudos = {
                titulo: responseJson.titulo as string,
                descricao: responseJson.descricao as string,
                duracaoEstimada: responseJson.duracaoEstimada as string,
                nivel: responseJson.nivel as string,
                objetivos: responseJson.objetivos || [],
                prerequisitos: responseJson.prerequisitos || [],
                modulos: responseJson.modulos || []
            }

            return trilhaEstudos;
        } catch (error) {
            console.error('Erro ao deserializar trilha de estudos:', error);
            console.error('Resposta recebida:', response);
            throw new Error('Erro ao processar resposta da IA');
        }
    }

    
}