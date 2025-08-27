
import { Questionario } from "@/domain/entities/Questionario";
import { GerarListaPerguntaDTO, IAiReposository } from "@/domain/interfaces/ai-interface";

export class CreatePerguntasQuestionarioUseCase {
  constructor(private geminiRepository : IAiReposository) {}

  async execute(data : GerarListaPerguntaDTO): Promise<Questionario> {

    const questionario = await this.geminiRepository.gerarPergunta(data);
    return questionario;

  }
}
