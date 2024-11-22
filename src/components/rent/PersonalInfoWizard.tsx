import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface Question {
  id: string;
  question: string;
  type: 'text' | 'date';
}

const questions: Question[] = [
  {
    id: 'firstName',
    question: 'What is your first name?',
    type: 'text'
  },
  {
    id: 'lastName',
    question: 'What is your last name?',
    type: 'text'
  },
  {
    id: 'dateOfBirth',
    question: 'What is your date of birth?',
    type: 'date'
  },
  {
    id: 'currentCity',
    question: 'Which city do you currently live in?',
    type: 'text'
  },
  {
    id: 'futureCity',
    question: 'Which city will you be moving to?',
    type: 'text'
  }
];

interface PersonalInfoWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PersonalInfoWizard = ({ open, onOpenChange }: PersonalInfoWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const currentQuestion = questions[currentStep];

  const handleNext = () => {
    const currentAnswer = answers[currentQuestion.id];
    
    if (!currentAnswer) {
      toast({
        title: "Required Field",
        description: "Please answer the question before proceeding.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('All answers:', answers);
      toast({
        title: "Success!",
        description: "Your personal information has been saved.",
      });
      onOpenChange(false);
      setCurrentStep(0);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-dialog sm:max-w-[425px] border-none bg-black/40">
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Personal Information</h2>
            <p className="text-white/60">Step {currentStep + 1} of {questions.length}</p>
          </div>

          <div className="space-y-6">
            <div className="animate-fade-in">
              <label className="block text-white/80 mb-2">{currentQuestion.question}</label>
              <Input
                type={currentQuestion.type}
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                onKeyDown={handleKeyPress}
                className="bg-transparent border-b border-white/20 rounded-none 
                         focus:border-primary/50 transition-all duration-300 
                         hover:border-white/40 focus:ring-0 px-1"
                placeholder="Type your answer here..."
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                Back
              </Button>
              <Button 
                onClick={handleNext}
                className="bg-primary hover:bg-primary/90 text-black"
              >
                {currentStep === questions.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalInfoWizard;