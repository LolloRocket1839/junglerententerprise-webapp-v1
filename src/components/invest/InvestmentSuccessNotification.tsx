import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface InvestmentSuccessNotificationProps {
  amount: string;
  propertyName: string;
}

const InvestmentSuccessNotification: React.FC<InvestmentSuccessNotificationProps> = ({
  amount,
  propertyName
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-start space-x-4 p-4 bg-background border rounded-lg shadow-lg">
      <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
      <div className="flex-1">
        <h4 className="font-semibold text-lg mb-2">
          Investimento Confermato!
        </h4>
        <p className="text-muted-foreground mb-4">
          Hai investito con successo €{parseFloat(amount).toLocaleString()} in {propertyName}.
          Puoi monitorare il tuo investimento nella dashboard.
        </p>
        <div className="flex gap-3">
          <Button
            variant="default"
            onClick={() => navigate('/invest?tab=my-investments')}
          >
            Vai ai Miei Investimenti
          </Button>
          <Button
            variant="outline"
            onClick={() => window.print()}
          >
            Scarica Ricevuta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSuccessNotification;