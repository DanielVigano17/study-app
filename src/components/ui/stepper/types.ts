export interface Step {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  isCompleted?: boolean;
  isOptional?: boolean;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (stepIndex: number) => void;
  onComplete?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  showNavigation?: boolean;
  showProgress?: boolean;
  allowSkip?: boolean;
  className?: string;
}

export interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  showLabels?: boolean;
  className?: string;
}

export interface StepContentProps {
  step: Step;
  isActive: boolean;
  className?: string;
}
