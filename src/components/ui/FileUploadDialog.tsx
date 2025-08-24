import { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { Button } from './button';
import { useToast } from './use-toast';
import { useStorageUpload } from '@/hooks/useStorageUpload';
import { Progress } from '@/components/ui/progress';

interface FileUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFilesUploaded?: (files: Array<{ publicUrl?: string; filePath: string }>) => void;
  allowedTypes?: string[];
  maxFiles?: number;
  bucket?: string;
  prefix?: string;
}

const FileUploadDialog = ({
  open,
  onOpenChange,
  onFilesUploaded,
  allowedTypes = ['image/*', 'application/pdf'],
  maxFiles = 5,
  bucket = 'student_documents',
  prefix = 'uploads'
}: FileUploadDialogProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  
  const { uploadFiles, uploading, progress, resetProgress, validateFile } = useStorageUpload(
    bucket,
    prefix,
    { maxSizeMB: 10 }
  );

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length + files.length > maxFiles) {
      toast({
        title: "Troppi file",
        description: `Puoi caricare massimo ${maxFiles} file alla volta.`,
        variant: "destructive"
      });
      return;
    }

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];
    
    acceptedFiles.forEach(file => {
      const error = validateFile(file);
      if (error) {
        invalidFiles.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
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
    }
  }, [files.length, maxFiles, toast, validateFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles
  });

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        title: "Nessun file selezionato",
        description: "Seleziona almeno un file per l'upload.",
        variant: "destructive"
      });
      return;
    }

    try {
      const uploadResults = await uploadFiles(files);
      const successfulUploads = uploadResults.filter(result => result.success);
      
      if (successfulUploads.length > 0) {
        onFilesUploaded?.(successfulUploads.map(result => ({
          publicUrl: result.publicUrl,
          filePath: result.filePath
        })));
        
        toast({
          title: "Upload completato!",
          description: `${successfulUploads.length} file caricati con successo.`
        });
        
        setFiles([]);
        resetProgress();
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Errore",
        description: "Errore durante l'upload dei file",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div
            {...getRootProps()}
            className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-sm text-gray-600">
              {isDragActive
                ? "Rilascia i file qui..."
                : uploading ? "Caricamento in corso..." : "Trascina i file qui o clicca per selezionare"}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              File supportati: Immagini e PDF (max {maxFiles} file, 10MB ciascuno)
            </p>
          </div>

          {/* Upload Progress */}
          {progress.length > 0 && (
            <div className="space-y-2 mb-4">
              {progress.map((p, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-700 truncate">{p.file.name}</span>
                    <span className={`${
                      p.status === 'completed' ? 'text-green-600' : 
                      p.status === 'error' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {p.status === 'completed' ? '✓' : 
                       p.status === 'error' ? '✗' : `${p.progress}%`}
                    </span>
                  </div>
                  <Progress value={p.progress} className="h-1" />
                   {p.error && (
                     <div className="flex items-center gap-1 text-xs text-red-600">
                       <AlertCircle className="w-3 h-3" />
                       {p.error}
                     </div>
                   )}
                 </div>
               ))}
             </div>
           )}

          {files.length > 0 && !uploading && (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <File className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 truncate max-w-[200px]">
                      {file.name}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(file)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <Button onClick={handleUpload} className="w-full" disabled={uploading}>
            {uploading ? "Caricando..." : `Carica ${files.length} file${files.length !== 1 ? '' : ''}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadDialog;