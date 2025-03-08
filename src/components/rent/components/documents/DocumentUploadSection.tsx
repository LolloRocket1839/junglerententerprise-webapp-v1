
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { StudentDocument, DocumentType } from "../../types/documents";
import { DocumentCard } from "./DocumentCard";

export function DocumentUploadSection() {
  const [documents, setDocuments] = useState<StudentDocument[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    const { data, error } = await supabase
      .from('student_documents')
      .select('*');

    if (error) {
      toast({
        title: "Errore",
        description: "Impossibile caricare i documenti",
        variant: "destructive"
      });
      return;
    }

    // Map database fields to our frontend types
    const mappedDocuments: StudentDocument[] = data.map(doc => ({
      id: doc.id,
      documentType: doc.document_type as DocumentType,
      status: doc.status,
      filePath: doc.file_path,
      uploadedAt: doc.uploaded_at,
      verifiedAt: doc.verified_at,
      rejectionReason: doc.rejection_reason
    }));

    setDocuments(mappedDocuments);
  }

  async function handleUpload(type: DocumentType, file: File) {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (!user || userError) {
      toast({
        title: "Errore",
        description: "Devi essere autenticato per caricare documenti",
        variant: "destructive"
      });
      return;
    }

    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/${type}_${Date.now()}.${fileExt}`;

    toast({
      title: "Caricamento in corso",
      description: "Il documento è in fase di caricamento..."
    });

    const { error: uploadError } = await supabase.storage
      .from('student_documents')
      .upload(filePath, file);

    if (uploadError) {
      toast({
        title: "Errore",
        description: "Impossibile caricare il documento",
        variant: "destructive"
      });
      return;
    }

    const { error: dbError } = await supabase
      .from('student_documents')
      .insert({
        student_id: user.id,
        document_type: type,
        file_path: filePath,
      });

    if (dbError) {
      toast({
        title: "Errore",
        description: "Impossibile salvare il documento",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Successo",
      description: "Documento caricato con successo"
    });

    loadDocuments();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-6">
        Documenti Richiesti
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {(['id_card', 'income_proof', 'student_id', 'guarantor_form'] as DocumentType[]).map(type => {
          const doc = documents.find(d => d.documentType === type) || {
            id: type,
            documentType: type,
            status: 'pending',
            filePath: '',
            uploadedAt: new Date().toISOString()
          };
          
          return (
            <DocumentCard
              key={type}
              document={doc}
              onUpload={(file) => handleUpload(type, file)}
            />
          );
        })}
      </div>
    </div>
  );
}
