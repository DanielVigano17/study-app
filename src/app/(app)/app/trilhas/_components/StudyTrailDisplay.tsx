"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { 
  BookOpen, 
  Clock, 
  Target, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  Download,
  User,
  Calendar,
  List,
  Lightbulb
} from "lucide-react"

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

interface StudyTrailDisplayProps {
  trail: StudyTrail
  onGenerateNew: () => void
}

export function StudyTrailDisplay({ trail, onGenerateNew }: StudyTrailDisplayProps) {
  const getLevelColor = (nivel: string) => {
    if (!nivel) {
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
    
    switch (nivel.toLowerCase()) {
      case 'iniciante':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'intermediario':
      case 'intermediário':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'avancado':
      case 'avançado':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {trail.titulo || 'Trilha de Estudos'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {trail.descricao || 'Descrição não disponível'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onGenerateNew}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Nova Trilha
          </Button>
        </div>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Visão Geral
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Duração:</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {trail.duracaoEstimada || 'Não definida'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Nível:</span>
              <Badge className={getLevelColor(trail.nivel)}>
                {trail.nivel || 'Não definido'}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Módulos:</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {trail.modulos?.length || 0}
              </span>
            </div>
          </div>

          {/* Objetivos */}
          {trail.objetivos && trail.objetivos.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Objetivos de Aprendizagem
              </h4>
              <ul className="space-y-1">
                {trail.objetivos.map((objetivo, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {objetivo}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pré-requisitos */}
          {trail.prerequisitos && trail.prerequisitos.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Pré-requisitos
              </h4>
              <ul className="space-y-1">
                {trail.prerequisitos.map((prerequisito, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Play className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    {prerequisito}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Módulos */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Módulos da Trilha
        </h3>
        
        {(trail.modulos || []).map((modulo, index) => (
          <Card key={modulo.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Módulo {index + 1}: {modulo.titulo || 'Módulo sem título'}
                </CardTitle>
                <Badge variant="secondary">
                  <Clock className="w-3 h-3 mr-1" />
                  {modulo.duracaoEstimada || 'Não definida'}
                </Badge>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {modulo.descricao || 'Descrição não disponível'}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Tópicos */}
              {modulo.topicos && modulo.topicos.length > 0 && (
                <div>
                  <h5 className="font-medium mb-2 flex items-center gap-2">
                    <List className="w-4 h-4" />
                    Tópicos
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {(modulo.topicos || []).map((topico, topicIndex) => (
                      <Badge key={topicIndex} variant="outline" className="text-xs">
                        {topico}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Recursos */}
                {modulo.recursos && modulo.recursos.length > 0 && (
                  <div>
                    <h5 className="font-medium mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Recursos Recomendados
                    </h5>
                    <ul className="space-y-1">
                      {(modulo.recursos || []).map((recurso, recursoIndex) => (
                        <li key={recursoIndex} className="text-sm text-gray-600 dark:text-gray-400">
                          • {recurso}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Atividades */}
                {modulo.atividades && modulo.atividades.length > 0 && (
                  <div>
                    <h5 className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Atividades Práticas
                    </h5>
                    <ul className="space-y-1">
                      {(modulo.atividades || []).map((atividade, atividadeIndex) => (
                        <li key={atividadeIndex} className="text-sm text-gray-600 dark:text-gray-400">
                          • {atividade}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Progresso da Trilha
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso</span>
              <span>0 de {trail.modulos?.length || 0} módulos concluídos</span>
            </div>
            <Progress value={0} className="w-full" />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Marque os módulos como concluídos conforme avança nos estudos
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
