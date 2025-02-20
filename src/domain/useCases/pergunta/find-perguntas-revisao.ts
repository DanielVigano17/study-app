import { IPerguntaRepository } from "@/domain/interfaces/perguntaInterface";
import { Pergunta } from "@/domain/entities/Pergunta";

export class FindPerguntasRevisao {
  constructor(private perguntaRepository : IPerguntaRepository) {}

  async execute(materiaId : string): Promise<Pergunta[] | null> {
    try{
        const perguntas = await this.perguntaRepository.findManyPergunta(materiaId);

        const perguntasParaRevisar = perguntas.filter(pergunta => {
            const dataUltimaRevisao = pergunta.dtUltimaRevisao ? new Date(pergunta.dtUltimaRevisao) : null;
        
            if (!dataUltimaRevisao) return true;
        
            // Adiciona os dias da próxima revisão à data da última revisão
            const dataProximaRevisao = new Date(dataUltimaRevisao);
            dataProximaRevisao.setDate(dataProximaRevisao.getDate() + pergunta.diasProximaRevisao);

            console.log(dataProximaRevisao);
        
            // Compara com a data atual
            return dataProximaRevisao <= new Date();
        });

        return perguntasParaRevisar.length > 0 ? perguntasParaRevisar : null;

    }catch(error){
        console.log(error);
        return null;
    }
  }
}
