
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Settings, Building2 } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-[#1a472a] via-[#2d5a3f] to-[#3d6b52] flex items-center justify-center p-6">
      <Card className="bg-black/50 border-white/10 p-8 max-w-md w-full">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-white mb-2">Jungle Rent</h1>
          <p className="text-white/60 mb-8">Scegli dove vuoi andare:</p>
          
          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/properties')}
              className="w-full glass-button text-lg py-4 flex items-center gap-3"
            >
              <Home className="h-6 w-6" />
              🏠 Tutte le Proprietà
            </Button>
            
            <Button 
              onClick={() => navigate('/admin')}
              variant="outline"
              className="w-full text-lg py-4 flex items-center gap-3 bg-white/10 border-white/20"
            >
              <Settings className="h-6 w-6" />
              Pannello Admin
            </Button>
            
            <Button 
              onClick={() => navigate('/marketplace')}
              variant="outline"
              className="w-full text-lg py-4 flex items-center gap-3 bg-white/10 border-white/20"
            >
              <Building2 className="h-6 w-6" />
              Marketplace
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Index;
