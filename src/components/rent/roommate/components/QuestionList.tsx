import { Question } from '../types/questions';
import { QuestionCard } from './QuestionCard';

interface QuestionListProps {
  questions: Question[];
  onAnswer: (questionId: string, answer: string) => void;
  isPremiumUser: boolean;
}

export const QuestionList = ({ questions, onAnswer, isPremiumUser }: QuestionListProps) => {
  return (
    <div className="space-y-4">
      {questions?.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          onAnswer={(answer) => onAnswer(question.id, answer)}
          isPremiumUser={isPremiumUser}
        />
      ))}
    </div>
  );
};