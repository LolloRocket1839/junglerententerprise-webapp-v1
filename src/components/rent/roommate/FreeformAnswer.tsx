import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";

interface FreeformAnswerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const FreeformAnswer = ({ value, onChange, onSubmit }: FreeformAnswerProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
        <MessageSquare className="h-4 w-4" />
        Share your detailed answer
      </h4>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your own answer to earn 2 Jungle Coins..."
        className="min-h-[100px] bg-white/5 border-white/10 text-white placeholder:text-white/40"
      />
      <Button
        variant="default"
        onClick={onSubmit}
        disabled={!value.trim()}
      >
        Submit Custom Answer
      </Button>
    </div>
  );
};

export default FreeformAnswer;