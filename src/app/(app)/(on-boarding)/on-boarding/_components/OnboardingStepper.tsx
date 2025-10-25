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

interface OnboardingStepperProps {
  userId: string | undefined;
  subscriptionId: string | null | undefined;
}

const OnboardingStepper: React.FC<OnboardingStepperProps> = ({ userId, subscriptionId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [materiaId, setMateriaId] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const router = useRouter();

  const handleOnComplete = () => {
    router.push("/app");
  };

  const goToNextStep = () => {
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
        subscriptionId={subscriptionId} 
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
        subscriptionId={subscriptionId!}
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
        subscriptionId={subscriptionId!}
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
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">O que você criou:</h4>
            <ul className="text-sm text-gray-700 space-y-1 text-left max-w-md mx-auto">
              <li>✅ Uma matéria organizada</li>
              <li>✅ Arquivo processado pela IA</li>
              <li>✅ 3 flashcards automáticos</li>
              <li>✅ Questionário de 5 questões</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full">
      <div className="container mx-auto px-4 py-8">
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
