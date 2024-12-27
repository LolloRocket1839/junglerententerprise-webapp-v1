import { InterestNode } from "./types";
import { supabase } from "@/integrations/supabase/client";

export function integrateNeuronIntoNetwork(
  newNeuron: InterestNode,
  existingNeurons: InterestNode[]
): InterestNode[] {
  const updatedNeurons = existingNeurons.map((oldNeuron) => {
    const overlap = oldNeuron.tags.filter((tag) => newNeuron.tags.includes(tag));
    if (overlap.length > 0) {
      const updatedWeight = oldNeuron.weight + overlap.length;
      const updatedConnections = new Set(oldNeuron.connections);
      updatedConnections.add(newNeuron.id);
      newNeuron.connections.push(oldNeuron.id);
      return {
        ...oldNeuron,
        weight: updatedWeight,
        connections: Array.from(updatedConnections),
      };
    }
    return oldNeuron;
  });

  return [...updatedNeurons, newNeuron];
}

export async function saveNeuronToDatabase(neuron: InterestNode) {
  try {
    const { error } = await supabase
      .from('interest_nodes')
      .insert({
        id: neuron.id,
        profile_id: neuron.profile_id,
        title: neuron.tags[0],
        description: neuron.tags.join(", "),
        position: neuron.position,
        resources: neuron.tags
      });

    if (error) throw error;

    // Create connections
    if (neuron.connections.length > 0) {
      const connections = neuron.connections.map(targetId => ({
        source_node_id: neuron.id,
        target_node_id: targetId,
        strength: neuron.weight
      }));

      const { error: connectionError } = await supabase
        .from('node_connections')
        .insert(connections);

      if (connectionError) throw connectionError;
    }
  } catch (error) {
    console.error('Error saving neuron:', error);
    throw error;
  }
}