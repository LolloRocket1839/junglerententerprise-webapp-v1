import { useState, useEffect } from 'react';
import { Brain, Plus, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { InterestNode } from './types';
import { createNeuronFromAnswer } from './neuronGenerator';
import { integrateNeuronIntoNetwork, saveNeuronToDatabase } from './neuronNetwork';
import NetworkVisualization from './NetworkVisualization';
import MatchStats from './MatchStats';

const NeuralMatch = () => {
  const [network, setNetwork] = useState<InterestNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadNetwork();
  }, []);

  const loadNetwork = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to use the neural matching system.",
          variant: "destructive"
        });
        return;
      }

      const { data: nodes, error } = await supabase
        .from('interest_nodes')
        .select('*')
        .eq('profile_id', user.id);

      if (error) throw error;

      const neurons: InterestNode[] = nodes.map(node => ({
        id: node.id,
        tags: node.resources as string[],
        weight: 1,
        connections: [],
        profile_id: node.profile_id,
        position: node.position as { x: number; y: number; z: number }
      }));

      setNetwork(neurons);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading network:', error);
      toast({
        title: "Error",
        description: "Failed to load neural network",
        variant: "destructive"
      });
    }
  };

  const handleAnswer = async (answer: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to save your answers.",
          variant: "destructive"
        });
        return;
      }

      const newNeuron = createNeuronFromAnswer(answer, user.id);
      const updatedNetwork = integrateNeuronIntoNetwork(newNeuron, network);
      
      await saveNeuronToDatabase(newNeuron);
      
      setNetwork(updatedNetwork);
      
      toast({
        title: "Neural network updated",
        description: `New neuron created with tags: ${newNeuron.tags.join(", ")}`,
      });
    } catch (error) {
      console.error('Error handling answer:', error);
      toast({
        title: "Error",
        description: "Failed to process your answer",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return <div className="p-8 text-white">Loading neural network...</div>;
  }

  return (
    <div className="min-h-screen bg-[#101010] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-primary animate-pulse" />
            <h2 className="text-2xl font-bold">Neural Match</h2>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Neuron
            </Button>
            <Button className="gap-2">
              <Users className="w-4 h-4" />
              View Matches
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="glass-card h-[600px] relative overflow-hidden">
              <NetworkVisualization nodes={network} />
            </div>
          </div>
          <div className="space-y-6">
            <MatchStats nodes={network} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralMatch;