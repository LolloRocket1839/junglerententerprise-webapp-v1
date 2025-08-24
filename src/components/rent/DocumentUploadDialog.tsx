import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDropzone } from 'react-dropzone';
import { Upload, File, Cloud, ExternalLink, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useState, useCallback } from 'react';
import { useStorageUpload } from '@/hooks/useStorageUpload';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DocumentUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDocumentsUploaded?: (documents: Array<{ type: string; filePath: string }>) => void;
}

const DocumentUploadDialog = ({ open, onOpenChange, onDocumentsUploaded }: DocumentUploadDialogProps) => {
  const [files, setFiles] = useState<Array<{ file: File; type: string }>>([]);
  const { toast } = useToast();
  
  const { uploadFiles, uploading, progress, resetProgress, validateFile } = useStorageUpload(
    'student_documents',
    'documents',
    { maxSizeMB: 10 }
  );

  const documentTypes = [
    { value: 'id_document', label: 'Documento di identità' },
    { value: 'student_enrollment', label: 'Certificato di iscrizione' },
    { value: 'income_proof', label: 'Documento di reddito' },
    { value: 'guarantor_document', label: 'Documento garante' },
    { value: 'other', label: 'Altro' }
  ];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles: Array<{ file: File; type: string }> = [];
    const invalidFiles: string[] = [];
    
    acceptedFiles.forEach(file => {
      const error = validateFile(file);
      if (error) {
        invalidFiles.push(`${file.name}: ${error}`);
      } else {
        validFiles.push({ file, type: 'other' }); // Default type
      }
    });
    
    if (invalidFiles.length > 0) {
      toast({
        title: "File non validi",
        description: invalidFiles.join(', '),
        variant: "destructive"
      });
    }
    
    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      toast({
        title: "File aggiunti",
        description: `${validFiles.length} file pronti per l'upload.`
      });
    }
  }, [toast, validateFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    }
  });

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        title: "Nessun file",
        description: "Seleziona almeno un file per l'upload",
        variant: "destructive"
      });
      return;
    }

    try {
      const uploadResults = await uploadFiles(files.map(f => f.file));
      
      // Create document records with types
      const documents = uploadResults
        .filter(result => result.success)
        .map((result, index) => ({
          type: files[index]?.type || 'other',
          filePath: result.filePath
        }));

      if (documents.length > 0) {
        onDocumentsUploaded?.(documents);
        toast({
          title: "Upload completato!",
          description: `${documents.length} documento(i) caricato(i) con successo`
        });
        setFiles([]);
        resetProgress();
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Errore",
        description: "Errore durante l'upload dei documenti",
        variant: "destructive"
      });
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const updateFileType = (index: number, type: string) => {
    setFiles(prev => prev.map((f, i) => 
      i === index ? { ...f, type } : f
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-dialog sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Upload Documents</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div
            {...getRootProps()}
            className={`p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-300
              ${isDragActive 
                ? 'border-primary bg-primary/10' 
                : 'border-white/20 hover:border-primary/50 hover:bg-white/5'}`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 mx-auto mb-4 text-white/60" />
            <p className="text-white/80">
              {isDragActive
                ? "Rilascia i file qui..."
                : uploading ? "Caricamento in corso..." : "Trascina i file qui o clicca per selezionare"}
            </p>
            <p className="text-sm text-white/60 mt-2">
              Supportati: PDF e immagini (max 10MB)
            </p>
          </div>

          {/* Upload Progress */}
          {progress.length > 0 && (
            <div className="mt-4 space-y-2">
              {progress.map((p, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/80 truncate">{p.file.name}</span>
                    <span className={`${
                      p.status === 'completed' ? 'text-green-400' : 
                      p.status === 'error' ? 'text-red-400' : 'text-white/60'
                    }`}>
                      {p.status === 'completed' ? '✓' : 
                       p.status === 'error' ? '✗' : `${p.progress}%`}
                    </span>
                  </div>
                  <Progress value={p.progress} className="h-1" />
                  {p.error && (
                    <div className="flex items-center gap-1 text-xs text-red-400">
                      <AlertCircle className="w-3 h-3" />
                      {p.error}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-center gap-4 mt-6">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border-white/10"
              onClick={() => window.open('https://drive.google.com')}
            >
              <Cloud className="w-4 h-4" />
              Google Drive
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border-white/10"
              onClick={() => window.open('https://onedrive.live.com')}
            >
              <ExternalLink className="w-4 h-4" />
              OneDrive
            </Button>
          </div>

          {files.length > 0 && !uploading && (
            <div className="mt-6 space-y-3">
              <h4 className="text-sm font-medium text-white">File selezionati:</h4>
              {files.map((fileData, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center space-x-2 flex-1">
                    <File className="w-4 h-4 text-white/60" />
                    <span className="text-sm text-white/80 truncate max-w-[150px]">
                      {fileData.file.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Select 
                      value={fileData.type} 
                      onValueChange={(type) => updateFileType(index, type)}
                    >
                      <SelectTrigger className="w-40 h-8 text-xs bg-white/10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map((docType) => (
                          <SelectItem key={docType.value} value={docType.value}>
                            {docType.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <button
                      onClick={() => removeFile(index)}
                      className="text-white/60 hover:text-white/90 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              <Button 
                onClick={handleUpload} 
                className="w-full mt-4 bg-primary hover:bg-primary/90"
                disabled={uploading}
              >
                {uploading ? "Caricamento..." : `Carica ${files.length} documento(i)`}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUploadDialog;