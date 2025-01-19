import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { ClipboardCheck, Users, MessageSquare } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
  onViewMatches: () => void;
}

const WelcomeScreen = ({ onStart, onViewMatches }: WelcomeScreenProps) => {
  const steps = [
    { icon: <ClipboardCheck className="w-5 h-5" />, text: "Breve Questionario" },
    { icon: <Users className="w-5 h-5" />, text: "Vedi Match" },
    { icon: <MessageSquare className="w-5 h-5" />, text: "Connettiti" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-2xl mx-auto text-center p-8"
    >
      <div className="space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-white"
        >
          Trova il tuo Coinquilino Ideale
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-white/80"
        >
          Rispondi a poche domande, trova i tuoi match e connettiti con potenziali coinquilini!
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button 
          onClick={onStart}
          className="glass-button bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          Inizia Questionario
        </Button>
        <Button 
          onClick={onViewMatches}
          variant="outline"
          size="lg"
          className="glass-button"
        >
          Vedi Match Precedenti
        </Button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="space-y-6"
      >
        <h3 className="text-lg font-semibold text-white">3 Passi per il tuo Match Perfetto</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.2 }}
              className="glass-card p-4 flex flex-col items-center gap-2"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                {step.icon}
              </div>
              <span className="text-sm font-medium text-white">{step.text}</span>
            </motion.div>
          ))}
        </div>
        <Progress value={0} className="h-2" />
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;