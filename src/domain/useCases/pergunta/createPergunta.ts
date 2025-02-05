import { CreatePerguntaDTO, IPerguntaRepository } from "@/domain/interfaces/perguntaInterface";
import { Pergunta } from "@/domain/entities/Pergunta";

export class CreatePerguntaUseCase {
  constructor(private perguntaRepository : IPerguntaRepository) {}

  async execute(data : CreatePerguntaDTO): Promise<Pergunta | null> {
    try{
        return await this.perguntaRepository.createPergunta(data);
    }catch(error){
        console.log(error);
        return null;
    }
  }
}
