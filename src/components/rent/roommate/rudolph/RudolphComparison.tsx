import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface RudolphComparisonProps {
  comparison: {
    id: string;
    category: string;
    component_a: string;
    component_b: string;
  };
  onChoice: (choice: string, comparisonId: string) => void;
  streak: number;
}

const RudolphComparison = ({ comparison, onChoice, streak }: RudolphComparisonProps) => {
  const getEncouragement = (streak: number) => {
    if (streak < 5) return "Keep going! 🌱";
    if (streak < 10) return "You're on fire! 🔥";
    if (streak < 15) return "Unstoppable! ⚡";
    if (streak < 20) return "Legendary! 👑";
    return "Godlike! 🌟";
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block bg-primary/20 text-primary px-4 py-1 rounded-full text-sm"
        >
          {comparison.category}
        </motion.span>
        {streak > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/60 mt-2"
          >
            {getEncouragement(streak)}
          </motion.p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card
            className="glass-card h-full cursor-pointer transition-all hover:bg-primary/10"
            onClick={() => onChoice(comparison.component_a, comparison.id)}
          >
            <div className="p-6 flex items-center justify-center min-h-[200px]">
              <p className="text-lg text-white text-center">
                {comparison.component_a}
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card
            className="glass-card h-full cursor-pointer transition-all hover:bg-primary/10"
            onClick={() => onChoice(comparison.component_b, comparison.id)}
          >
            <div className="p-6 flex items-center justify-center min-h-[200px]">
              <p className="text-lg text-white text-center">
                {comparison.component_b}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RudolphComparison;