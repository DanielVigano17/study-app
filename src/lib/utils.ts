import { updatePerguntaAction } from "@/app/(app)/app/actions";
import { modules } from "@/domain";
import { Pergunta } from "@/domain/entities/Pergunta";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function calcularProximaRevisao(flashcard: Pergunta, nota: number): Promise<Pergunta> {

  // Atualiza a facilidade (EF) com base na nota do usuário
  flashcard.facilidade = flashcard.facilidade + (0.1 - (5 - nota) * (0.08 + (5 - nota) * 0.02));
  if (flashcard.facilidade < 1.3) flashcard.facilidade = 1.3; // O valor de EF não pode ser inferior a 1.3

  // Verifica se o usuário errou (nota menor que 5) e reseta o intervalo para 1 dia
  if (nota < 5) {
    flashcard.diasProximaRevisao = 0; // Redefine o intervalo para revisar hoje
  } else {
    // Calcula o próximo intervalo (número de dias até a próxima revisão)
    if (flashcard.diasProximaRevisao === 0) {
      flashcard.diasProximaRevisao = 1; // Primeira revisão após 1 dia
    } else if (flashcard.diasProximaRevisao === 1) {
      flashcard.diasProximaRevisao = 3; // Segunda revisão após 3 dias
    } else {
      flashcard.diasProximaRevisao = Math.round(flashcard.diasProximaRevisao * flashcard.facilidade); // Multiplica o intervalo pela facilidade
    }
  }

  // Atualiza a data da última revisão
  const hoje = new Date();
  flashcard.dtUltimaRevisao = hoje;

  // await modules.useCase.pergunta.update.execute(flashcard, flashcard.id);

  await updatePerguntaAction(flashcard, flashcard.id);

  console.log(flashcard);
  
  return flashcard;
}


export function diferencaDias(data1 : Date, data2 : Date) {
  const umDia = 1000 * 60 * 60 * 24; // Milissegundos em um dia
  const diffEmMs = Math.abs(data2.getTime() - data1.getTime()); // Diferença em ms
  return Math.floor(diffEmMs / umDia); // Converter para dias
}