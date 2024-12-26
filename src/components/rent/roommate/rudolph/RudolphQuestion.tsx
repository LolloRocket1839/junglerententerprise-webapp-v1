import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface QuestionProps {
  question: {
    question: string;
    category: string;
    options: any[];
  };
  onAnswer: (option: any) => void;
}

const RudolphQuestion = ({ question, onAnswer }: QuestionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-sm text-primary font-medium">
          {question.category}
        </span>
        <h3 className="text-xl font-semibold text-white">
          {question.question}
        </h3>
      </div>

      <div className="grid gap-3">
        {question.options.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant="outline"
              className="w-full justify-start text-left transition-all duration-300 hover:bg-primary/20 hover:text-primary"
              onClick={() => onAnswer(option)}
            >
              {option.text}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RudolphQuestion;