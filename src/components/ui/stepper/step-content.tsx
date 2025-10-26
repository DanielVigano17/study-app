"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { StepContentProps } from "./types";

export const StepContent: React.FC<StepContentProps> = ({
  step,
  isActive,
  className,
}) => {
  if (!isActive) {
    return null;
  }

  return (
    <div
      className={cn(
        "animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
        className
      )}
    >
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">{step.title}</h2>
          {step.description && (
            <p className="text-muted-foreground">{step.description}</p>
          )}
        </div>
        
        <div className="mt-6">
          {step.content}
        </div>
      </div>
    </div>
  );
};
