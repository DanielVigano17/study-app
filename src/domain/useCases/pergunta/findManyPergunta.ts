import { CreatePerguntaDTO, IPerguntaRepository } from "@/domain/interfaces/perguntaInterface";
import { Pergunta } from "@/domain/entities/Pergunta";

export class FindManyPergunta {
  constructor(private perguntaRepository : IPerguntaRepository) {}

  async execute(materiaId : string): Promise<Pergunta[] | null> {
    try{
        return await this.perguntaRepository.findManyPergunta(materiaId);
    }catch(error){
        console.log(error);
        return null;
    }
  }
}
