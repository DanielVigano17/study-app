export interface ModuloTrilha {
  id: number
  titulo: string
  descricao: string
  duracaoEstimada: string
  topicos: string[]
  recursos: string[]
  atividades: string[]
}

export interface TrilhaEstudos {
  titulo: string
  descricao: string
  duracaoEstimada: string
  nivel: string
  modulos: ModuloTrilha[]
  objetivos: string[]
  prerequisitos: string[]
}
