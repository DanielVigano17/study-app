"use client";

import React, { useState } from "react";
import { Stepper, Step } from "@/components/ui/stepper";
import { Sparkles, User } from "lucide-react";
import UpdateUserForm from "./UpdateUserForm";
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OnboardingStepperProps {
  userId: string | undefined;
}

const OnboardingStepper: React.FC<OnboardingStepperProps> = ({ userId }) => {
  const [currentStep, setCurrentStep] = useState(0);


  const steps: Step[] = [
    {
      id: "welcome",
      title: "Bem-vindo ao SmartStudy!",
      description: "Vamos configurar sua conta em alguns passos simples",
      content: (
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Bem-vindo ao SmartStudy!</h3>
            <p className="text-muted-foreground">
              Sua plataforma inteligente para estudos com IA. Vamos começar configurando seu perfil.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "profile",
      title: "",
      description: "",
      content: <UpdateUserForm id={userId} />,
    },
  ];

  return (
    <div className="h-full">
      <div className="container mx-auto px-4 py-8">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
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
