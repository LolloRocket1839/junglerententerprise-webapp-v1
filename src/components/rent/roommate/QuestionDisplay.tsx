import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Question } from "./QuestionPool";

interface QuestionDisplayProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

const QuestionDisplay = ({ question, onAnswer }: QuestionDisplayProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <span className="text-sm text-primary font-medium">
          {question.category}
        </span>
        <h3 className="text-xl font-semibold text-white">
          {question.text}
        </h3>
      </div>

      <div className="grid gap-3">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start text-left hover:bg-primary/20 hover:text-primary"
            onClick={() => onAnswer(option)}
          >
            {option}
            <ArrowRight className="ml-auto h-4 w-4" />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay;