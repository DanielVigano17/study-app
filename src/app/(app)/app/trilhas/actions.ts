"use server"

interface GenerateStudyTrailParams {
  materia: string
  descricaoAdicional: string
  nivel: string
  duracao: string
  userId: string
  subscriptionId: string
}

interface StudyTrail {
  titulo: string
  descricao: string
  duracaoEstimada: string
  nivel: string
  modulos: {
    id: number
    titulo: string
    descricao: string
    duracaoEstimada: string
    topicos: string[]
    recursos: string[]
    atividades: string[]
  }[]
  objetivos: string[]
  prerequisitos: string[]
}

export async function generateStudyTrailAction(params: GenerateStudyTrailParams): Promise<{ trilha?: StudyTrail, error?: { message: string } }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/ia/gerar-trilha`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      console.error('Erro na resposta da API:', response.status, response.statusText)
      return { error: { message: `Erro na API: ${response.status} ${response.statusText}` } }
    }

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('Resposta não é JSON:', text)
      return { error: { message: 'Erro de formato na resposta da API' } }
    }

    const data = await response.json()

    if (data.status !== 200) {
      return { error: { message: data.message || 'Erro ao gerar trilha de estudos' } }
    }

    return { trilha: data.trilha }
  } catch (error) {
    console.error('Erro ao gerar trilha:', error)
    return { error: { message: 'Erro interno do servidor' } }
  }
}
