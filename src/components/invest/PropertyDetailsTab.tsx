import React from 'react';
import { Info, Users, Star, ExternalLink } from 'lucide-react';

const PropertyDetailsTab: React.FC = () => {
  return (
    <div className="space-y-4 text-gray-300">
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="font-semibold text-white mb-2">Dettagli Proprietà</h4>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            Tipo: Appartamento Residenziale
          </li>
          <li className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Capacità: 4-6 persone
          </li>
          <li className="flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" />
            Rating: 8/10
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PropertyDetailsTab;