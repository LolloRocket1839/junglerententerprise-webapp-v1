
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Clock } from 'lucide-react';

interface Box {
  boxId: string;
  description: string;
  status: 'deposited' | 'in_transit' | 'ready_for_pickup' | 'emergency_access_scheduled';
  depositDate: string;
  storageLocation: string;
  retrievalDate: string | null;
  lastUpdated: string;
  photos: string[];
  emergencyAccessRequested: boolean;
}

const mockBoxes: Box[] = [
  {
    boxId: "BX-78901",
    description: "Libri e materiale di studio",
    status: "deposited",
    depositDate: "2026-05-30T14:30:00",
    storageLocation: "Deposito Roma Centro",
    retrievalDate: null,
    lastUpdated: "2026-05-30T15:45:00",
    photos: ["https://storage.junglerent.com/boxes/BX-78901/deposit-1.jpg"],
    emergencyAccessRequested: false
  }
];

const StudentBelongingsManager = () => {
  const [boxes] = useState<Box[]>(mockBoxes);

  return (
    <div className="p-4 space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Periodo di Deposito Estivo</h3>
        <p className="text-sm text-blue-700 mb-2">
          Puoi depositare fino a 3 scatole durante il periodo estivo (1 Giugno - 31 Agosto 2026).
        </p>
        <div className="flex items-center text-sm text-blue-700">
          <Clock className="h-4 w-4 mr-1" />
          <span>Il tuo periodo di deposito inizia tra: 35 giorni</span>
        </div>
      </div>

      {boxes.map(box => (
        <Card key={box.boxId}>
          <CardHeader>
            <CardTitle className="text-lg">{box.description}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-2">
              <Package className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm">ID: {box.boxId}</span>
            </div>
            <p className="text-sm text-gray-600">Location: {box.storageLocation}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Dettagli</Button>
            <Button>Richiedi Accesso</Button>
          </CardFooter>
        </Card>
      ))}

      {boxes.length < 3 && (
        <Card className="border-dashed">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <Package className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-center text-gray-500 mb-4">
              Puoi aggiungere un'altra scatola
              <br />
              <span className="text-sm">({3 - boxes.length} slot disponibili)</span>
            </p>
            <Button>Registra Nuova Scatola</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentBelongingsManager;
