import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Scale } from "lucide-react";

interface IncomparableChoiceProps {
  incomparable: {
    item_a: string;
    item_b: string;
    category: string;
  };
  onChoice: (choice: string) => void;
}

const IncomparableChoice = ({ incomparable, onChoice }: IncomparableChoiceProps) => {
  if (!incomparable) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Scale className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary font-medium">
            {incomparable.category}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-white">
          Which one has more Rudolph energy?
        </h3>
        <p className="text-sm text-white/60">
          Trust your intuition - there's no right or wrong answer!
        </p>
      </div>

      <div className="grid gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            className="w-full p-6 h-auto text-lg font-medium hover:bg-primary/20"
            onClick={() => onChoice(incomparable.item_a)}
          >
            {incomparable.item_a}
          </Button>
        </motion.div>

        <div className="flex items-center justify-center">
          <span className="text-sm text-white/40">or</span>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            className="w-full p-6 h-auto text-lg font-medium hover:bg-primary/20"
            onClick={() => onChoice(incomparable.item_b)}
          >
            {incomparable.item_b}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default IncomparableChoice;