
import { Clock, CheckCircle, XCircle, Upload } from "lucide-react";
import { StudentDocument } from "../../types/documents";
import { GlassCard } from "@/components/ui/glass-card";

interface DocumentCardProps {
  document: StudentDocument;
  onUpload: (file: File) => void;
}

export function DocumentCard({ document, onUpload }: DocumentCardProps) {
  const statusIcons = {
    pending: <Clock className="h-5 w-5 text-yellow-500" />,
    approved: <CheckCircle className="h-5 w-5 text-green-500" />,
    rejected: <XCircle className="h-5 w-5 text-red-500" />
  };

  const documentLabels: Record<DocumentType, string> = {
    id_card: "Carta d'Identità",
    income_proof: "Prova di Reddito",
    student_id: "Tessera Universitaria",
    guarantor_form: "Modulo Garante"
  };

  return (
    <GlassCard className="relative overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {statusIcons[document.status]}
          <div>
            <h3 className="text-sm font-medium text-white">
              {documentLabels[document.documentType]}
            </h3>
            <p className="text-xs text-white/70">
              {document.status === 'pending' ? 'In Revisione' : 
               document.status === 'approved' ? 'Approvato' :
               'Respinto'}
            </p>
          </div>
        </div>
        <label className="glass-button cursor-pointer">
          <Upload className="h-4 w-4" />
          <span className="sr-only">Carica documento</span>
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onUpload(file);
            }}
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </label>
      </div>
    </GlassCard>
  );
}
