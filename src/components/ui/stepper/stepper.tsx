"use client";

import React from "react";
import { ChevronLeft, ChevronRight, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { StepContent } from "./step-content";
import { StepperProps } from "./types";

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepChange,
  onComplete,
  onNext,
  onPrevious,
  showNavigation = true,
  showProgress = true,
  allowSkip = false,
  className,
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (isLastStep) {
      console.log("onComplete");
      onComplete?.();
    } else {
      onNext?.();
      onStepChange(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      onPrevious?.();
      onStepChange(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (allowSkip && !isLastStep) {
      onStepChange(currentStep + 1);
    }
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Progress Bar */}
      {showProgress && (
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Passo {currentStep + 1} de {steps.length}</span>
            <span>{Math.round(progress)}% concluído</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}


      {/* Step Content */}
      <div className="min-h-[400px] flex items-center justify-center">
        <StepContent
          step={currentStepData}
          isActive={true}
          className="w-full"
        />
      </div>

      {/* Navigation */}
      {showNavigation && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstStep}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {allowSkip && !isLastStep && (
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="flex items-center gap-2"
              >
                <SkipForward className="h-4 w-4" />
                Pular
              </Button>
            )}
            
            <Button
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              {isLastStep ? "Concluir" : "Próximo"}
              {!isLastStep && <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
