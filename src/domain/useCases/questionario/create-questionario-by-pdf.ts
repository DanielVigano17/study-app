import { IQuestionarioRepository } from "@/domain/interfaces/questionarioInterface";
import { Questionario } from "@/domain/entities/Questionario";
import { GerarQuestionarioPDFDTO, IAiReposository } from "@/domain/interfaces/ai-interface";

export class CreateQuestionarioByPDFUseCase {
  constructor(private questionarioRepository : IQuestionarioRepository,
    private aiRepository : IAiReposository
  ) {}

  async execute(data : GerarQuestionarioPDFDTO): Promise<Questionario | null> {
    try{

        const questionario = await this.aiRepository.gerarQuestionarioByPDF({
            urlPDF : data.urlPDF,
            materiaId : data.materiaId
        });

        console.log(questionario);

        const questionarioCriado = await this.questionarioRepository.createQuestionario({
            perguntas : questionario.perguntas,
            materiaId : data.materiaId
        });
        
        return questionarioCriado;
    }catch(error){
        console.log(error);
        return null;
    }
  }
}
