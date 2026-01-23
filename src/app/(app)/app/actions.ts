"use server"

import { Materia } from "@/domain/entities/Materia";
import { revalidatePath, revalidateTag } from "next/cache";
import { CreateFileDTO } from "@/domain/interfaces/fileInterface";
import { File } from "@/domain/entities/File";
import { CreateFlashcardDTO, UpdateFlashcardDTO } from "@/domain/interfaces/flashcardInterface";
import { Flashcard } from "@/domain/entities/Flashcard";
import { Questionario } from "@/domain/entities/Questionario";

type novaMateriaData={
  titulo : string
  image? : string
}

interface ErrorResponse {
  error: string;
  message: string;
  feature: string;
  current: number;
  limit: number;
}

export async function novaMateriaAction({titulo,image} : novaMateriaData, userId? : string, subscriptionId?: string): Promise<{ materia?: Materia; error?: ErrorResponse }> {
  try {
    if (!userId) return { error: { error: "Erro", message: "Usuário não fornecido", feature: "subjects", current: 0, limit: 0 } };

    const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + `/api/materia/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ titulo, image, userId, subscriptionId }),
    });

    if (!response.ok) {
      if (response.status === 403) {
        const errorData = JSON.parse(response.statusText);
        return { error: errorData };
      }
      throw new Error("Erro ao criar matéria");
    }

    const { materia } = await response.json();

    revalidatePath('/app');
    revalidateTag('list-materias');
    return { materia };

  } catch (e) {
    console.error(e);
    return { error: { error: "Erro", message: "Erro ao criar matéria", feature: "subjects", current: 0, limit: 0 } };
  }
}

export async function listMateriasAction(userId : string) {
    const res = await fetch(process.env.NEXT_PUBLIC_APP_URL+`/api/list-materias/${userId}`, {
        next: {
          tags: ['list-materias'],
        },
        cache:"force-cache"
      });
      
    const  {materias} : {materias : Materia[]} = await res.json();

    return materias;
}

export async function createFileAction(data : CreateFileDTO) : Promise<File> {

  const response = await fetch(process.env.NEXT_PUBLIC_APP_URL+`/api/files/createFile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
    
  const {file} = await response.json();

  if(!file) throw new Error("Erro ao salvar arquivo no banco de dados");
  return file;
}

export async function deleteFileAction(fileId : string, filePath : string) : Promise<File> {

  const response = await fetch(process.env.NEXT_PUBLIC_APP_URL+`/api/files/removeFile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({fileId, filePath}),
  });
    
  const {file} = await response.json();

  if(!file) throw new Error("Erro ao salvar arquivo no banco de dados");
  return file;
}
export async function deleteMateriaAction(materiaId : string) : Promise<Materia | null> {

  const response = await fetch(process.env.NEXT_PUBLIC_APP_URL+`/api/materia/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(materiaId),
  });
    
  const {materia} = await response.json();

  if(!materia) return null;
  revalidateTag('list-materias');
  return materia;
}

export async function deletePerguntaAction(perguntaId : string) : Promise<Flashcard | null> {

  const response = await fetch(process.env.NEXT_PUBLIC_APP_URL+`/api/pergunta/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(perguntaId),
  });
    
  const {pergunta} = await response.json();

  if(!pergunta) return null;
  revalidateTag('list-materias');
  return pergunta;
}

export async function createFlashcardAction(data: CreateFlashcardDTO, userId: string, subscriptionId: string): Promise<{ flashcard?: Flashcard; error?: ErrorResponse }> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + `/api/pergunta/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, userId, subscriptionId }),
    });

    if (!response.ok) {
      if (response.status === 403) {
        const errorData: ErrorResponse = JSON.parse(response.statusText);
        return { error: errorData };
      }
      throw new Error("Erro ao cadastrar pergunta");
    }

    const { pergunta } = await response.json();
    revalidateTag('list-materias');
    return { flashcard: pergunta };
  } catch (error) {
    throw new Error("Erro ao cadastrar pergunta");
  }
}
export async function createManyFlashcardAction(urlPdf : string, userId: string, subscriptionId: string, materiaId: string): Promise<{ count: number }> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + `/api/pergunta/createMany`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ urlPdf, userId, subscriptionId, materiaId }),
    });

    const { count } = await response.json();
    revalidateTag('list-materias');
    return { count };
    
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao cadastrar perguntas");
  }
}

export async function updatePerguntaAction(data : UpdateFlashcardDTO, id : string) : Promise<Flashcard> {
  const response = await fetch(process.env.NEXT_PUBLIC_APP_URL+`/api/pergunta/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({object : data, id : id}),
  });
    
  const {pergunta} = await response.json();

  if(!pergunta) throw new Error("Erro ao fazer update de pergunta");
  revalidateTag('list-materias');
  return pergunta;
}

export async function findManyPerguntasAction(materiaId : string) : Promise<Flashcard[]> {

  const response = await fetch(process.env.NEXT_PUBLIC_APP_URL+`/api/pergunta/getPerguntas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({materiaId : materiaId}),
  });
    
  const {perguntas} = await response.json();

  if(!perguntas) throw new Error("Erro ao buscar perguntas");
  return perguntas;
}

export async function listFilesAction(materiaId : string) {

  const response = await fetch(process.env.NEXT_PUBLIC_APP_URL+`/api/files/listFiles`, {
    method: 'POST',
    next : {
      tags: ['listFiles']
    },
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(materiaId),
  });
    
  const {files} = await response.json();

  if(!files) throw new Error("Erro ao salvar arquivo no banco de dados");

  return files;
}

export async function createPerguntasAction(prompt: string, materiaId: string, quntidadePerguntas: number, dificuldade: string, userId: string, subscriptionId: string): Promise<{ questionario?: Questionario, error?: { message: string } }> {
  const response = await fetch(process.env.NEXT_PUBLIC_APP_URL+`/api/ia/gerar-perguntas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      materiaId,
      quntidadePerguntas,
      dificuldade,
      userId,
      subscriptionId
    }),
  });

  if (!response.ok) {
    if (response.status === 403) {
      const errorData = JSON.parse(response.statusText);
      return { error: errorData };
    }
    throw new Error("Erro ao gerar perguntas");
  }
    
  const {questionario} = await response.json();
  if(!questionario) throw new Error("Erro ao gerar perguntas");
  return { questionario };
}

export async function generateFlashcardAnswerAction(question: string) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + '/api/flashcard/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    })

    if (!response.ok) {
      const error = await response.json()
      return { error: { message: error.error || 'Erro ao gerar resposta' } }
    }

    const data = await response.json()
    return { answer: data.answer }
  } catch (error) {
    return { error: { message: 'Erro ao gerar resposta' } }
  }
}

export async function deleteQuestionarioAction(id: string): Promise<{ success?: boolean; error?: { message: string } }> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + `/api/questionario/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: { message: error.message || 'Erro ao deletar questionário' } };
    }

    return { success: true };
  } catch (error) {
    return { error: { message: 'Erro ao deletar questionário' } };
  }
}

export async function createQuestionarioByAiAction(url : string, userId : string, subscriptionId : string, materiaId : string) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + `/api/questionario/create-by-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ urlPdf : url, materiaId, userId, subscriptionId }),
    });

    const { questionario } = await response.json();
    return questionario;
  }
  catch(error){
    console.log(error);
    throw new Error("Erro ao gerar questionário");
  }
}

export async function getFlashcardsParaRevisaoAction(materiaId : string) : Promise<Flashcard[]> {
  try 
  {
      const response = await fetch(process.env.NEXT_PUBLIC_APP_URL+`/api/pergunta/get-flashcards-para-revisao`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({materiaId : materiaId}),
      });

      const {flashcardsParaRevisar} = await response.json();

      if(!flashcardsParaRevisar) 
        return [];

      return flashcardsParaRevisar;
  } catch (error) 
  {
      console.log(error);
      return [];
  }
  
}