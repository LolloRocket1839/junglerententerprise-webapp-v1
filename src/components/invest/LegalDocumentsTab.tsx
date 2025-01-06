import React from 'react';
import { ExternalLink } from 'lucide-react';

const LegalDocumentsTab: React.FC = () => {
  return (
    <div className="space-y-4 text-gray-300">
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="font-semibold text-white mb-2">Documenti Legali</h4>
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
              <ExternalLink className="w-4 h-4" />
              Contratto di Investimento
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
              <ExternalLink className="w-4 h-4" />
              Termini e Condizioni
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LegalDocumentsTab;