import { IQuestionarioRepository } from "@/domain/interfaces/questionarioInterface";
import { Questionario } from "@/domain/entities/Questionario";
import { GerarQuestionarioPDFDTO, IAiReposository } from "@/domain/interfaces/ai-interface";

export class CreateQuestionarioByPDFUseCase {
  constructor(private questionarioRepository : IQuestionarioRepository,
    private aiRepository : IAiReposository
  ) {}

  async execute(data : GerarQuestionarioPDFDTO): Promise<Questionario | null> {
    try{

        const pdf = await this.aiRepository.gerarQuestionarioPDF({
            urlPDF : data.urlPDF,
            materiaId : data.materiaId
        });

        const listaPerguntas = JSON.parse(pdf);
        console.log(listaPerguntas);

        const questionario = await this.questionarioRepository.createQuestionario({
            perguntas : listaPerguntas,
            materiaId : data.materiaId
        });
        
        return questionario;
    }catch(error){
        console.log(error);
        return null;
    }
  }
}
