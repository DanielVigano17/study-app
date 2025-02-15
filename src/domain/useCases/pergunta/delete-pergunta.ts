import { IPerguntaRepository } from "@/domain/interfaces/perguntaInterface";
import { Pergunta } from "@prisma/client";


export default class DeletePerguntaUseCase {

    constructor(private perguntaRepository : IPerguntaRepository){}
    async execute(perguntaId : string) : Promise<Pergunta | null>{
        try{
            const perguntaExcluida = await this.perguntaRepository.deletePergunta(perguntaId);
            return perguntaExcluida;
            
        }catch(error){
            console.error(error);
            return null;
        }
    }
}