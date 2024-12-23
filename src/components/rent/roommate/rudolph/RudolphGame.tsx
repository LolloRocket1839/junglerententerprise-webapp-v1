import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export type Choice = 'component_a' | 'component_b';

export interface Comparison {
  id: string;
  component_a: string;
  component_b: string;
}

const RudolphGame = () => {
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const { toast } = useToast();

  const handleChoice = async (choice: Choice) => {
    setSelectedChoice(choice);
    try {
      // Record the choice in the database
      const { error } = await supabase
        .from('rudolph_progress')
        .insert({
          choice,
          created_at: new Date().toISOString(),
          profile_id: 'your_profile_id', // Replace with actual profile ID
          rudolph_score: 0, // Replace with actual score logic
        });

      if (error) throw error;

      toast({
        title: "Choice recorded!",
        description: `You chose ${choice}.`,
      });
    } catch (error) {
      console.error('Error recording choice:', error);
      toast({
        title: "Error",
        description: "Failed to record your choice. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Rudolph Game</h2>
      <div className="flex gap-4">
        <Button onClick={() => handleChoice('component_a')}>Choose Component A</Button>
        <Button onClick={() => handleChoice('component_b')}>Choose Component B</Button>
      </div>
      {selectedChoice && <p>You selected: {selectedChoice}</p>}
    </div>
  );
};

export default RudolphGame;