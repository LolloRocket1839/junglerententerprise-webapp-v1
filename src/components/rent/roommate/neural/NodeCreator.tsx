import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface NodeCreatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNodeCreated: () => void;
}

const NodeCreator = ({ open, onOpenChange, onNodeCreated }: NodeCreatorProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [resource, setResource] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('interest_nodes')
        .insert({
          title,
          description,
          resources: resource ? [resource] : [],
          position: {
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            z: Math.random() * 100 - 50
          }
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "New neuron created successfully!",
      });

      setTitle('');
      setDescription('');
      setResource('');
      onOpenChange(false);
      onNodeCreated();
    } catch (error) {
      console.error('Error creating node:', error);
      toast({
        title: "Error",
        description: "Failed to create neuron",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#101010] text-white">
        <DialogHeader>
          <DialogTitle>Create New Neuron</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title">Interest Name</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Photography, Cooking, etc."
              className="bg-[#1a1a1a] border-[#333]"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us more about this interest..."
              className="bg-[#1a1a1a] border-[#333]"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="resource">Resource Link (Optional)</label>
            <Input
              id="resource"
              type="url"
              value={resource}
              onChange={(e) => setResource(e.target.value)}
              placeholder="https://..."
              className="bg-[#1a1a1a] border-[#333]"
            />
          </div>
          <Button type="submit" className="w-full">Create Neuron</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NodeCreator;