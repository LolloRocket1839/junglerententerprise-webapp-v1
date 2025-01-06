import React from 'react';

const PropertyDetailsTab = () => {
  return (
    <div className="space-y-4 text-white/80">
      <div>
        <h4 className="font-semibold mb-2">Caratteristiche dell'Investimento</h4>
        <ul className="list-disc pl-4 space-y-2">
          <li>Rendimento annuale previsto: 8-12%</li>
          <li>Periodo minimo di investimento: 24 mesi</li>
          <li>Gestione professionale della proprietà</li>
          <li>Report trimestrali dettagliati</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Vantaggi Fiscali</h4>
        <ul className="list-disc pl-4 space-y-2">
          <li>Detrazioni fiscali disponibili</li>
          <li>Consulenza fiscale inclusa</li>
          <li>Ottimizzazione del rendimento</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Gestione Proprietà</h4>
        <ul className="list-disc pl-4 space-y-2">
          <li>Manutenzione programmata</li>
          <li>Servizio di pulizia professionale</li>
          <li>Assicurazione completa inclusa</li>
        </ul>
      </div>
    </div>
  );
};

export default PropertyDetailsTab;