import { cn } from "@/lib/utils";
import type { BookingStep } from "@/types";

interface StepIndicatorProps {
  currentStep: BookingStep;
  totalSteps?: number;
}

export default function StepIndicator({ currentStep, totalSteps = 2 }: StepIndicatorProps) {
  return (
    <div className="flex gap-2 mb-12" role="progressbar" aria-valuenow={currentStep} aria-valuemax={totalSteps}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={cn(
            "h-1 flex-1 transition-colors duration-300",
            currentStep >= i + 1 ? "bg-black" : "bg-neutral-200"
          )}
        />
      ))}
    </div>
  );
}
