import { Progress } from "@/components/ui/progress";

interface QuestionStatsProps {
  questionsLength: number;
  categoriesLength: number;
}

export const QuestionStats = ({ questionsLength, categoriesLength }: QuestionStatsProps) => {
  return (
    <div className="mt-4">
      <Progress value={(questionsLength / (categoriesLength ?? 1)) * 100} />
      <p className="text-sm text-white/60 text-right mt-2">
        {questionsLength} questions completed
      </p>
    </div>
  );
};