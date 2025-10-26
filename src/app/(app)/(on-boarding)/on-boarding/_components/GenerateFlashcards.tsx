"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, RotateCcw, CheckCircle, Loader2, Eye, EyeOff, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type GenerateFlashcardsProps = {
    materiaId: string;
    fileUrl: string;
    userId: string;
    onNext?: () => void;
};

const GenerateFlashcards = ({ materiaId, fileUrl, userId, onNext }: GenerateFlashcardsProps) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [flashcards, setFlashcards] = useState<any[]>([]);
    const [currentCard, setCurrentCard] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

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
                            Para gerar flashcards, você precisa fazer upload de um arquivo primeiro.
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
                                        na etapa anterior para que nossa IA possa gerar os flashcards.
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
            const response = await fetch('/api/pergunta/createMany/sem-assinatura', {
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
                throw new Error('Erro ao gerar flashcards');
            }

            const result = await response.json();
            
            if (result.status === 200) {
                console.log("Flashcards generated successfully, fetching list...");
                
                // Buscar os flashcards gerados
                const flashcardsResponse = await fetch(`/api/pergunta/list?materiaId=${materiaId}`);
                
                if (!flashcardsResponse.ok) {
                    console.error("Error fetching flashcards:", flashcardsResponse.status);
                    throw new Error('Erro ao buscar flashcards');
                }
                
                const flashcardsData = await flashcardsResponse.json();
                console.log("Fetched flashcards:", flashcardsData);
                
                // Pegar apenas os 3 primeiros flashcards
                const firstThree = flashcardsData.slice(0, 3);
                console.log("First three flashcards:", firstThree);
                
                setFlashcards(firstThree);
                setShowSuccess(true);
                toast.success("3 flashcards gerados com sucesso!");
            } else {
                throw new Error('Erro na geração');
            }
        } catch (error) {
            console.error('Erro ao gerar flashcards:', error);
            toast.error("Erro ao gerar flashcards. Tente novamente.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNextCard = () => {
        if (currentCard < flashcards.length - 1) {
            setCurrentCard(currentCard + 1);
            setIsFlipped(false);
        } else {
            // Todos os cards foram vistos
            onNext?.();
        }
    };

    const handlePreviousCard = () => {
        if (currentCard > 0) {
            setCurrentCard(currentCard - 1);
            setIsFlipped(false);
        }
    };

    if (showSuccess && flashcards.length > 0) {
        return (
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">3. Flashcards Gerados!</h3>
                        <p className="text-gray-600 mt-2">
                            Nossa IA criou {flashcards.length} flashcards baseados no seu material. 
                            Teste um exemplo interativo!
                        </p>
                    </div>
                </div>

                <Card className="min-h-[300px]">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Flashcard {currentCard + 1} de {flashcards.length}</CardTitle>
                            <div className="flex gap-2">
                                <Button 
                                    onClick={handlePreviousCard}
                                    disabled={currentCard === 0}
                                    variant="outline"
                                    size="sm"
                                >
                                    Anterior
                                </Button>
                                <Button 
                                    onClick={handleNextCard}
                                    variant="outline"
                                    size="sm"
                                >
                                    {currentCard === flashcards.length - 1 ? 'Finalizar' : 'Próximo'}
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div 
                            className="relative w-full h-48 cursor-pointer transition-all duration-300"
                            onClick={handleFlip}
                        >
                            {/* Face da Pergunta */}
                            <div 
                                className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
                                    isFlipped ? 'opacity-0' : 'opacity-100'
                                }`}
                            >
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 h-full flex items-center justify-center">
                                    <div className="text-center">
                                        <h4 className="text-lg font-semibold mb-2">Pergunta</h4>
                                        <p className="text-lg">{flashcards[currentCard]?.acao}</p>
                                        <p className="text-sm opacity-80 mt-2">Clique para ver a resposta</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Face da Resposta */}
                            <div 
                                className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
                                    isFlipped ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 h-full flex items-center justify-center">
                                    <div className="text-center">
                                        <h4 className="text-lg font-semibold mb-2">Resposta</h4>
                                        <p className="text-lg">{flashcards[currentCard]?.resposta}</p>
                                        <p className="text-sm opacity-80 mt-2">Clique para ver a pergunta</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="bg-blue-100 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                            <h4 className="font-medium text-blue-900">IA Inteligente</h4>
                            <p className="text-blue-700 text-sm mt-1">
                                Nossa IA analisou seu material e criou perguntas que realmente testam 
                                sua compreensão dos conceitos mais importantes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Brain className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">3. Gerar Flashcards com IA</h3>
                    <p className="text-gray-600 mt-2">
                        Nossa IA vai analisar seu material e criar 3 flashcards automáticos 
                        com as perguntas mais importantes.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Geração Automática de Flashcards</CardTitle>
                    <CardDescription>
                        Clique no botão abaixo para gerar flashcards baseados no seu arquivo
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <h4 className="font-medium text-blue-900">Como Funciona</h4>
                                <ul className="text-blue-700 text-sm mt-1 space-y-1">
                                    <li>• A IA analisa todo o conteúdo do seu arquivo</li>
                                    <li>• Identifica os conceitos mais importantes</li>
                                    <li>• Cria perguntas que testam sua compreensão</li>
                                    <li>• Gera respostas detalhadas e educativas</li>
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
                                Gerando flashcards...
                            </>
                        ) : (
                            <>
                                <Brain className="w-4 h-4 mr-2" />
                                Gerar 3 Flashcards
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

export default GenerateFlashcards;
