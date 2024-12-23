import { useState, useEffect } from 'react';
import { Brain, Plus, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import NodeCreator from './NodeCreator';
import NetworkVisualization from './NetworkVisualization';
import MatchStats from './MatchStats';
import { supabase } from "@/integrations/supabase/client";

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface InterestNode {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  resources: string[];
  position: Position;
  profile_id: string | null;
  created_at: string;
  updated_at: string;
}

const NeuralMatch = () => {
  const [nodes, setNodes] = useState<InterestNode[]>([]);
  const [isCreatingNode, setIsCreatingNode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadNodes();
  }, []);

  const loadNodes = async () => {
    try {
      const { data, error } = await supabase
        .from('interest_nodes')
        .select('*');
      
      if (error) throw error;
      
      if (data) {
        const formattedNodes = data.map(node => {
          // Ensure position is properly formatted
          let position: Position = { x: 0, y: 0, z: 0 };
          
          if (node.position && typeof node.position === 'object') {
            const pos = node.position as any;
            position = {
              x: typeof pos.x === 'number' ? pos.x : 0,
              y: typeof pos.y === 'number' ? pos.y : 0,
              z: typeof pos.z === 'number' ? pos.z : 0
            };
          }

          // Ensure resources is properly formatted
          const resources = Array.isArray(node.resources) 
            ? node.resources.map(r => String(r))
            : [];

          return {
            id: node.id,
            title: node.title,
            description: node.description,
            category: node.category,
            resources,
            position,
            profile_id: node.profile_id,
            created_at: node.created_at,
            updated_at: node.updated_at
          };
        });
        
        setNodes(formattedNodes);
      }
    } catch (error) {
      console.error('Error loading nodes:', error);
      toast({
        title: "Error",
        description: "Failed to load interest nodes",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#101010] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-primary animate-pulse" />
            <h2 className="text-2xl font-bold">Neural Match</h2>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setIsCreatingNode(true)}
            >
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
              <NetworkVisualization nodes={nodes} />
            </div>
          </div>
          <div className="space-y-6">
            <MatchStats nodes={nodes} />
          </div>
        </div>

        <NodeCreator 
          open={isCreatingNode}
          onOpenChange={setIsCreatingNode}
          onNodeCreated={loadNodes}
        />
      </div>
    </div>
  );
};

export default NeuralMatch;