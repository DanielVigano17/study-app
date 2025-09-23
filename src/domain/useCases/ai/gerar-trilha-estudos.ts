import { TrilhaEstudos } from "@/domain/entities/TrilhaEstudos";
import { GerarTrilhaEstudosDTO, IAiReposository } from "@/domain/interfaces/ai-interface";

export class GerarTrilhaEstudosUseCase {
  constructor(private aiRepository: IAiReposository) {}

  async execute(data: GerarTrilhaEstudosDTO): Promise<TrilhaEstudos> {
    const trilha = await this.aiRepository.gerarTrilhaEstudos(data);
    return trilha;
  }
}
