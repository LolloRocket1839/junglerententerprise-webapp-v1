import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface Question {
  id: string;
  question: string;
  type: 'text' | 'number' | 'select';
  options?: string[];
  validation?: (value: string) => boolean;
}

const questions: Question[] = [
  {
    id: 'age',
    question: 'What is your age?',
    type: 'number',
    validation: (value) => parseInt(value) >= 18
  },
  {
    id: 'university',
    question: 'Which university do you attend?',
    type: 'text'
  },
  {
    id: 'year',
    question: 'What year are you in?',
    type: 'select',
    options: ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', 'Masters', 'PhD']
  },
  {
    id: 'studyType',
    question: 'What type of studies are you pursuing?',
    type: 'text'
  },
  {
    id: 'duration',
    question: 'How long is your study program? (in years)',
    type: 'number'
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

    if (currentQuestion.validation && !currentQuestion.validation(currentAnswer)) {
      toast({
        title: "Invalid Input",
        description: "Please provide a valid answer.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Here you would typically save the data
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-dialog sm:max-w-[425px]">
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Personal Information</h2>
            <p className="text-white/60">Step {currentStep + 1} of {questions.length}</p>
          </div>

          <div className="space-y-6">
            <div className="animate-fade-in">
              <label className="block text-white mb-2">{currentQuestion.question}</label>
              {currentQuestion.type === 'select' ? (
                <select
                  className="w-full bg-white/10 text-white border border-white/20 rounded-lg p-2"
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                >
                  <option value="">Select an option</option>
                  {currentQuestion.options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <Input
                  type={currentQuestion.type}
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="bg-white/10 text-white border-white/20"
                />
              )}
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="bg-white/10 hover:bg-white/20"
              >
                Back
              </Button>
              <Button onClick={handleNext}>
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