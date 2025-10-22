"use client";

import React from "react";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepIndicatorProps } from "./types";

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick,
  showLabels = true,
  className,
}) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isClickable = onStepClick && (isCompleted || isCurrent);

        return (
          <div key={step.id} className="flex flex-col items-center">
            <div className="flex items-center">
              {/* Linha conectora */}
              {index > 0 && (
                <div
                  className={cn(
                    "h-0.5 w-8 transition-colors duration-200",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )}
                />
              )}

              {/* Círculo do passo */}
              <button
                onClick={() => isClickable && onStepClick?.(index)}
                disabled={!isClickable}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-200",
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCurrent
                    ? "border-primary bg-background text-primary"
                    : "border-muted bg-background text-muted-foreground",
                  isClickable && "hover:scale-105 cursor-pointer",
                  !isClickable && "cursor-not-allowed"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </button>

              {/* Linha conectora */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 w-8 transition-colors duration-200",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>

            {/* Labels */}
            {showLabels && (
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    isCurrent
                      ? "text-primary"
                      : isCompleted
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
