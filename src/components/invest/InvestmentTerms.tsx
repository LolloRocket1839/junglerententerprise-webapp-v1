import React from 'react';
import { FileText } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const InvestmentTerms = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="terms">
        <AccordionTrigger className="text-sm">
          <FileText className="w-4 h-4 mr-2" />
          Termini e Condizioni
        </AccordionTrigger>
        <AccordionContent className="text-sm text-muted-foreground">
          <p className="mb-2">
            Investendo in questa proprietà, accetti i nostri termini e condizioni completi. Punti chiave:
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Periodo minimo di investimento: 24 mesi</li>
            <li>Commissioni di gestione: 2% annuo</li>
            <li>Distribuzione dei rendimenti: trimestrale</li>
          </ul>
          <a 
            href="#" 
            className="text-primary hover:underline mt-2 inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leggi i termini completi
          </a>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default InvestmentTerms;