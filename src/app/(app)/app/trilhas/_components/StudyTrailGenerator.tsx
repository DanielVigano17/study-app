"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, BookOpen, Clock, Target, CheckCircle } from "lucide-react"
import { StudyTrailDisplay } from "./StudyTrailDisplay"
import { generateStudyTrailAction } from "@/app/(app)/app/trilhas/actions"

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

interface StudyTrailGeneratorProps {
  userId: string
  subscriptionId: string
}

export function StudyTrailGenerator({ userId, subscriptionId }: StudyTrailGeneratorProps) {
  const [materia, setMateria] = useState("")
  const [descricaoAdicional, setDescricaoAdicional] = useState("")
  const [nivel, setNivel] = useState("")
  const [duracao, setDuracao] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTrail, setGeneratedTrail] = useState<StudyTrail | null>(null)
  const [error, setError] = useState("")

  const handleGenerate = async () => {
    if (!materia.trim()) {
      setError("Por favor, informe a matéria ou tema de estudo")
      return
    }

    if (!nivel) {
      setError("Por favor, selecione o nível de conhecimento")
      return
    }

    if (!duracao) {
      setError("Por favor, selecione a duração desejada")
      return
    }

    setIsGenerating(true)
    setError("")
    
    try {
      const result = await generateStudyTrailAction({
        materia: materia.trim(),
        descricaoAdicional: descricaoAdicional.trim(),
        nivel,
        duracao,
        userId,
        subscriptionId
      })

      if (result.error) {
        setError(result.error.message)
      } else if (result.trilha) {
        setGeneratedTrail(result.trilha)
      }
    } catch (err) {
      setError("Erro ao gerar trilha de estudos. Tente novamente.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleReset = () => {
    setGeneratedTrail(null)
    setMateria("")
    setDescricaoAdicional("")
    setNivel("")
    setDuracao("")
    setError("")
  }

  if (generatedTrail) {
    return (
      <StudyTrailDisplay 
        trail={generatedTrail} 
        onGenerateNew={handleReset}
      />
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Gerar Nova Trilha de Estudos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="materia">Matéria ou Tema *</Label>
            <Input
              id="materia"
              placeholder="Ex: Cálculo I, História do Brasil, Programação Python..."
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição Adicional (opcional)</Label>
            <Textarea
              id="descricao"
              placeholder="Descreva objetivos específicos, áreas de interesse ou contexto adicional..."
              value={descricaoAdicional}
              onChange={(e) => setDescricaoAdicional(e.target.value)}
              disabled={isGenerating}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nível de Conhecimento *</Label>
              <Select value={nivel} onValueChange={setNivel} disabled={isGenerating}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iniciante">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-green-500" />
                      Iniciante
                    </div>
                  </SelectItem>
                  <SelectItem value="intermediario">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-yellow-500" />
                      Intermediário
                    </div>
                  </SelectItem>
                  <SelectItem value="avancado">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-red-500" />
                      Avançado
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Duração Desejada *</Label>
              <Select value={duracao} onValueChange={setDuracao} disabled={isGenerating}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a duração" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-semana">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      1 semana
                    </div>
                  </SelectItem>
                  <SelectItem value="2-semanas">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      2 semanas
                    </div>
                  </SelectItem>
                  <SelectItem value="1-mes">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      1 mês
                    </div>
                  </SelectItem>
                  <SelectItem value="2-meses">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      2 meses
                    </div>
                  </SelectItem>
                  <SelectItem value="3-meses">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      3 meses
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Gerando Trilha...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Gerar Trilha de Estudos
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
