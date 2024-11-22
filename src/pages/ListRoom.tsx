import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ListRoom = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Room Listed Successfully",
      description: "Your room has been listed for swap. You'll be notified of interested parties.",
    });
    navigate("/rent");
  };

  return (
    <div className="min-h-screen pt-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-6 md:p-8 space-y-8">
          <h1 className="text-2xl font-bold text-white">List Your Room for Swap</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Current Room Photo</label>
                  <div className="aspect-video rounded-lg overflow-hidden glass">
                    <img 
                      src="https://images.unsplash.com/photo-1483058712412-4245e9b90334" 
                      alt="Room Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Current Hub</label>
                  <Input 
                    defaultValue="Villa Roma Nord"
                    readOnly
                    className="glass-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Room Number</label>
                  <Input 
                    defaultValue="304"
                    readOnly
                    className="glass-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Current Price</label>
                  <Input 
                    defaultValue="€650/month"
                    readOnly
                    className="glass-input"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Swap Preferences</label>
                  <Textarea 
                    placeholder="Describe what you're looking for in a swap..."
                    className="glass-input min-h-[120px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Add Tags</label>
                  <Input 
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Type and press Enter (e.g. nightlife, city center)"
                    className="glass-input"
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="glass py-1 px-3">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 hover:text-destructive"
                        >
                          <X size={14} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Preferred Location</label>
                  <Input 
                    placeholder="e.g. City Center, Near University"
                    className="glass-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Price Range Flexibility</label>
                  <Input 
                    placeholder="e.g. ±€50/month"
                    className="glass-input"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                className="glass-button"
                onClick={() => navigate("/rent")}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="glass-button bg-primary/20 hover:bg-primary/30"
              >
                List Room
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListRoom;