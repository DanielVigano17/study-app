import { IFlashcardRepository } from "@/domain/interfaces/flashcardInterface";
import { GerarRespostaDTO, IAiReposository } from "@/domain/interfaces/ai-interface";

export class CreateResponseFlashcard {
  constructor(private flashcardRepository : IFlashcardRepository,
    private readonly aiRepository : IAiReposository
  ) {}

  async execute(data : GerarRespostaDTO): Promise<string> {
        const flashcardsSerializado = await this.aiRepository.gerarRespostaFlashcard(data);
        let resposta = JSON.parse(flashcardsSerializado);

        return resposta;
  }
}
