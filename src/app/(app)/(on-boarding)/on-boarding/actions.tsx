"use server"

import { modules } from "@/domain";

export type ActionResponse = {
  error?: string;
  success?: boolean;
}

export default async function actionSalvarNome(id: string | undefined, name: string): Promise<ActionResponse> {
  try {
    if(!id) {
      return {
        error: "ID do usuário não fornecido",
        success: false
      }
    }
    
    await modules.useCase.user.updateUser.execute(id, {name});
    return {
      success: true
    }
  } catch (error) {
    return {
      error: "Erro ao salvar nome do usuário",
      success: false
    }
  }
}
