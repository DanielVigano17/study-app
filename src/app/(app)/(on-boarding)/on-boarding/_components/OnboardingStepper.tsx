"use client";

import React, { useState } from "react";
import { Stepper, Step } from "@/components/ui/stepper";
import { Sparkles, User, Upload, Brain, BookOpen, CheckCircle } from "lucide-react";
import UpdateUserForm from "./UpdateUserForm";
import CreateMateriaForm from "./CreateMateriaForm";
import RealFileUpload from "./RealFileUpload";
import GenerateFlashcards from "./GenerateFlashcards";
import GenerateQuiz from "./GenerateQuiz";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface OnboardingStepperProps {
  userId: string | undefined;
}

const OnboardingStepper: React.FC<OnboardingStepperProps> = ({ userId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [materiaId, setMateriaId] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const router = useRouter();

  const handleOnComplete = () => {
    router.push("/app");
  };

  const goToNextStep = () => {
    // Verificar se está tentando avançar para etapas que dependem de arquivo
    if (currentStep === 3 && (!fileUrl || fileUrl.trim() === '')) {
      toast.error("Você precisa fazer upload de um arquivo antes de gerar flashcards!");
      return;
    }
    
    if (currentStep === 4 && (!fileUrl || fileUrl.trim() === '')) {
      toast.error("Você precisa fazer upload de um arquivo antes de gerar questionários!");
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleOnComplete();
    }
  };

  const handleMateriaCreated = (newMateriaId: string) => {
    setMateriaId(newMateriaId);
    goToNextStep();
  };

  const handleFileUploaded = (newFileUrl: string) => {
    setFileUrl(newFileUrl);
    goToNextStep();
  };
  
  const steps: Step[] = [
    {
      id: "welcome",
      title: "",
      description: "",
      content: (
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Bem-vindo ao SmartStudy!</h3>
            <p className="text-muted-foreground text-lg">
              Vamos criar sua primeira matéria e gerar conteúdo real com IA. 
              Em poucos passos você terá flashcards e questionários prontos!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "profile",
      title: "Informações Pessoais",
      description: "Configure suas informações básicas",
      content: <UpdateUserForm id={userId} onNext={goToNextStep} />,
    },
    {
      id: "create-materia",
      title: "Criar Matéria",
      description: "Vamos começar criando uma matéria para organizar seus estudos",
      content: <CreateMateriaForm 
        userId={userId} 
        onNext={handleMateriaCreated} 
      />,
    },
    {
      id: "upload-file",
      title: "",
      description: "",
      content: <RealFileUpload 
        materiaId={materiaId} 
        onNext={handleFileUploaded} 
      />,
    },
    {
      id: "generate-flashcards",
      title: "",
      description: "",
      content: <GenerateFlashcards 
        materiaId={materiaId}
        fileUrl={fileUrl}
        userId={userId!}
        onNext={goToNextStep}
      />,
    },
    {
      id: "generate-quiz",
      title: "",
      description: "",
      content: <GenerateQuiz 
        materiaId={materiaId}
        fileUrl={fileUrl}
        userId={userId!}
        onNext={goToNextStep}
      />,
    },
    {
      id: "complete",
      title: "",
      description: "",
      content: (
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">Parabéns!</h3>
            <p className="text-gray-600 text-lg">
              Você criou sua primeira matéria, fez upload de um arquivo e gerou 
              flashcards e questionários reais com IA!
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100">
              <h4 className="font-semibold text-gray-900 mb-4 text-center">O que você criou:</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  </div>
                  <span>Uma matéria organizada</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  </div>
                  <span>Arquivo processado pela IA</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  </div>
                  <span>3 flashcards automáticos</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  </div>
                  <span>Questionário de 5 questões</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full">
      <div className="container mx-auto px-1 md:px-4 py-8">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          onComplete={handleOnComplete}
          showNavigation={true}
          showProgress={true}
          allowSkip={false}
          className="max-w-4xl mx-auto"
        />
      </div>
    </div>
  );
};

export default OnboardingStepper;
