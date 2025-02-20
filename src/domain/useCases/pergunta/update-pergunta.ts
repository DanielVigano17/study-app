import { CreatePerguntaDTO, IPerguntaRepository, UpdatePerguntaDTO } from "@/domain/interfaces/perguntaInterface";
import { Pergunta } from "@/domain/entities/Pergunta";

export class UpdatePerguntaUseCase {
  constructor(private perguntaRepository : IPerguntaRepository) {}

  async execute(data : UpdatePerguntaDTO, id : string): Promise<Pergunta | null> {
    try{
        return await this.perguntaRepository.update(data, id);
    }catch(error){
        console.log(error);
        return null;
    }
  }
}
