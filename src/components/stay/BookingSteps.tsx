
import { Check } from "lucide-react";

interface BookingStepsProps {
  currentStep: number;
}

export const BookingSteps = ({ currentStep }: BookingStepsProps) => {
  const steps = [
    { id: 1, name: "Scegli alloggio" },
    { id: 2, name: "Date e ospiti" },
    { id: 3, name: "Dati personali" },
    { id: 4, name: "Conferma" }
  ];

  return (
    <div className="hidden md:flex items-center justify-center mb-8 px-4">
      <ol className="flex items-center w-full max-w-3xl">
        {steps.map((step, i) => (
          <li key={step.id} className={`flex items-center ${i === steps.length - 1 ? 'w-auto' : 'w-full'}`}>
            <div className="flex flex-col items-center">
              <div 
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
                  ${currentStep > step.id 
                    ? 'bg-green-500 border-green-500' 
                    : currentStep === step.id 
                      ? 'border-primary bg-primary text-white' 
                      : 'border-white/30 bg-white/5'}`}
              >
                {currentStep > step.id ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <span className={`text-sm font-semibold ${currentStep === step.id ? 'text-white' : 'text-white/50'}`}>
                    {step.id}
                  </span>
                )}
              </div>
              <span 
                className={`mt-2 text-xs ${
                  currentStep >= step.id ? 'text-white' : 'text-white/50'
                }`}
              >
                {step.name}
              </span>
            </div>
            
            {i < steps.length - 1 && (
              <div 
                className={`w-full h-0.5 transition-colors ${
                  currentStep > step.id + 1 
                    ? 'bg-green-500' 
                    : currentStep > step.id 
                      ? 'bg-gradient-to-r from-green-500 to-white/30' 
                      : 'bg-white/30'
                }`}
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};
