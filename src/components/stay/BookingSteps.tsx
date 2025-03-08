
import { CalendarDays, CreditCard, Home, Search, User } from "lucide-react";

export const BookingSteps = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { icon: Search, label: "Cerca" },
    { icon: Home, label: "Scegli" },
    { icon: CalendarDays, label: "Date" },
    { icon: User, label: "Dettagli" },
    { icon: CreditCard, label: "Pagamento" }
  ];

  return (
    <div className="flex justify-between items-center max-w-4xl mx-auto mb-8 px-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index + 1 === currentStep;
        const isCompleted = index + 1 < currentStep;
        
        return (
          <div key={index} className="flex flex-col items-center relative">
            {index > 0 && (
              <div 
                className={`absolute h-[2px] w-[100px] -left-[50px] top-5 -z-10 
                  ${isCompleted ? 'bg-primary' : 'bg-white/10'}`}
              />
            )}
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2
                ${isActive ? 'bg-primary text-primary-foreground' : 
                  isCompleted ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/50'}`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span className={`text-sm ${isActive ? 'text-white' : 'text-white/50'}`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
