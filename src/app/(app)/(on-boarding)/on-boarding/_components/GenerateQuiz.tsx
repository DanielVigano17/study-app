"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, XCircle, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type GenerateQuizProps = {
    materiaId: string;
    fileUrl: string;
    userId: string;
    onNext?: () => void;
};

const GenerateQuiz = ({ materiaId, fileUrl, userId, onNext }: GenerateQuizProps) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [quiz, setQuiz] = useState<any>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    // Verificar se o arquivo está disponível
    if (!fileUrl || fileUrl.trim() === '') {
        return (
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <XCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Arquivo Necessário</h3>
                        <p className="text-gray-600 mt-2">
                            Para gerar questionários, você precisa fazer upload de um arquivo primeiro.
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-red-600">Arquivo não encontrado</CardTitle>
                        <CardDescription>
                            Volte à etapa anterior e faça upload de um arquivo para continuar.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-red-50 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                                <div>
                                    <h4 className="font-medium text-red-900">Ação Necessária</h4>
                                    <p className="text-red-700 text-sm mt-1">
                                        Você precisa fazer upload de um arquivo (PDF, documento ou texto) 
                                        na etapa anterior para que nossa IA possa gerar o questionário.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const handleGenerate = async () => {
        setIsGenerating(true);
        
        try {
            const response = await fetch('/api/questionario/create-by-pdf/sem-assinatura', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    urlPdf: fileUrl,
                    materiaId: materiaId,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao gerar questionário');
            }

            const result = await response.json();
            console.log("Quiz generation result:", result);
            
            if (result.status === 200) {
                console.log("Quiz data:", result.questionario);
                console.log("Quiz perguntas:", result.questionario?.perguntas);
                
                // Verificar se o questionário tem a estrutura esperada
                if (!result.questionario) {
                    console.error("No questionario in response");
                    toast.error("Nenhum questionário foi retornado");
                    return;
                }
                
                if (!result.questionario.perguntas || !Array.isArray(result.questionario.perguntas)) {
                    console.error("Invalid quiz structure:", result.questionario);
                    toast.error("Estrutura do questionário inválida");
                    return;
                }
                
                // Verificar se cada pergunta tem opções
                const hasValidQuestions = result.questionario.perguntas.every((pergunta: any) => 
                    pergunta && pergunta.opcoes && Array.isArray(pergunta.opcoes)
                );
                
                if (!hasValidQuestions) {
                    console.error("Some questions are invalid:", result.questionario.perguntas);
                    toast.error("Algumas perguntas estão inválidas");
                    return;
                }
                
                setQuiz(result.questionario);
                toast.success("Questionário gerado com sucesso!");
            } else {
                throw new Error('Erro na geração');
            }
        } catch (error) {
            console.error('Erro ao gerar questionário:', error);
            toast.error("Erro ao gerar questionário. Tente novamente.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleAnswerSelect = (answerIndex: number) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestion] = answerIndex;
        setSelectedAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestion < quiz.perguntas.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Calcular pontuação
            let correctAnswers = 0;
            quiz.perguntas.forEach((pergunta: any, index: number) => {
                const selectedAnswerIndex = selectedAnswers[index];
                if (selectedAnswerIndex !== undefined) {
                    const selectedOption = pergunta.opcoes[selectedAnswerIndex];
                    if (selectedOption && selectedOption.isCorreta) {
                        correctAnswers++;
                    }
                }
            });
            setScore(correctAnswers);
            setShowResults(true);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleFinish = () => {
        onNext?.();
    };

    if (showResults && quiz) {
        const percentage = Math.round((score / quiz.perguntas.length) * 100);
        
        return (
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Questionário Concluído!</h3>
                        <p className="text-gray-600 mt-2">
                            Você acertou {score} de {quiz.perguntas.length} questões ({percentage}%)
                        </p>
                    </div>
                </div>

                <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                    <CardContent className="p-6">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600 mb-2">{percentage}%</div>
                            <h4 className="text-xl font-semibold text-green-800 mb-2">
                                {percentage >= 80 ? 'Excelente!' : percentage >= 60 ? 'Bom trabalho!' : 'Continue estudando!'}
                            </h4>
                            <p className="text-green-700 mb-4">
                                {percentage >= 80 
                                    ? 'Você dominou o conteúdo!' 
                                    : percentage >= 60 
                                        ? 'Você está no caminho certo!' 
                                        : 'Revisar o material pode ajudar.'
                                }
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                            <h4 className="font-medium text-blue-900">Questionário Adaptativo</h4>
                            <p className="text-blue-700 text-sm mt-1">
                                Este questionário foi criado especificamente para o seu material. 
                                A IA identificou os conceitos mais importantes e criou perguntas 
                                que realmente testam sua compreensão.
                            </p>
                        </div>
                    </div>
                </div>

                <Button onClick={handleFinish} className="w-full" size="lg">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Continuar para o App
                </Button>
            </div>
        );
    }

    if (quiz && !showResults) {
        // Verificar se o quiz tem perguntas válidas
        if (!quiz.perguntas || !Array.isArray(quiz.perguntas) || quiz.perguntas.length === 0) {
            console.error("Quiz has no valid questions:", quiz);
            return (
                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-red-600" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Erro no Questionário</h3>
                            <p className="text-gray-600 mt-2">
                                O questionário não possui perguntas válidas. Tente gerar novamente.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }
        
        const currentQ = quiz.perguntas[currentQuestion];
        
        // Verificar se currentQ e suas propriedades existem
        if (!currentQ || !currentQ.opcoes || !Array.isArray(currentQ.opcoes)) {
            console.error("Current question data is invalid:", currentQ);
            return (
                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-red-600" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Erro no Questionário</h3>
                            <p className="text-gray-600 mt-2">
                                Houve um problema ao carregar as questões. Tente gerar o questionário novamente.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }
        
        return (
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">4. Questionário Adaptativo</h3>
                        <p className="text-gray-600 mt-2">
                            Teste seus conhecimentos com {quiz.perguntas.length} questões 
                            criadas especificamente para o seu material.
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Questão {currentQuestion + 1} de {quiz.perguntas.length}</CardTitle>
                            <div className="text-sm text-gray-500">
                                {quiz.nome}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="text-lg font-medium mb-4">
                                {currentQ.pergunta}
                            </h4>
                            
                            <div className="space-y-2">
                                {currentQ.opcoes.map((opcao: any, index: number) => (
                                    <button
                                        key={opcao.id}
                                        onClick={() => handleAnswerSelect(index)}
                                        className={`w-full p-3 text-left rounded-lg border transition-colors ${
                                            selectedAnswers[currentQuestion] === index
                                                ? 'bg-blue-100 border-blue-500 text-blue-700'
                                                : 'hover:bg-gray-50 border-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-4 h-4 rounded-full border-2 ${
                                                selectedAnswers[currentQuestion] === index
                                                    ? 'bg-blue-500 border-blue-500'
                                                    : 'border-gray-300'
                                            }`}>
                                                {selectedAnswers[currentQuestion] === index && (
                                                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                                                )}
                                            </div>
                                            <span>{opcao.texto}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <Button 
                                onClick={handlePreviousQuestion}
                                disabled={currentQuestion === 0}
                                variant="outline"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Anterior
                            </Button>
                            <Button 
                                onClick={handleNextQuestion}
                                disabled={selectedAnswers[currentQuestion] === undefined}
                            >
                                {currentQuestion === quiz.perguntas.length - 1 ? 'Finalizar' : 'Próxima'}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">4. Gerar Questionário com IA</h3>
                    <p className="text-gray-600 mt-2">
                        Nossa IA vai criar um questionário de 10 questões baseado no seu material, 
                        testando sua compreensão dos conceitos mais importantes.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Geração Automática de Questionário</CardTitle>
                    <CardDescription>
                        Clique no botão abaixo para gerar um questionário adaptativo baseado no seu arquivo
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <h4 className="font-medium text-blue-900">Como Funciona</h4>
                                <ul className="text-blue-700 text-sm mt-1 space-y-1">
                                    <li>• A IA analisa todo o conteúdo do seu arquivo</li>
                                    <li>• Identifica os conceitos mais importantes</li>
                                    <li>• Cria 10 perguntas de múltipla escolha</li>
                                    <li>• Gera alternativas realistas e uma resposta correta</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <Button 
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full"
                        size="lg"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                Gerando questionário...
                            </>
                        ) : (
                            <>
                                <BookOpen className="w-4 h-4 mr-2" />
                                Gerar Questionário (10 questões)
                            </>
                        )}
                    </Button>

                    {isGenerating && (
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Isso pode levar alguns segundos...
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default GenerateQuiz;
