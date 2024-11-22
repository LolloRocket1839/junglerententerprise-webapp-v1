import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDropzone } from 'react-dropzone';
import { Upload, File, Cloud, Microsoft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useState, useCallback } from 'react';

interface DocumentUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DocumentUploadDialog = ({ open, onOpenChange }: DocumentUploadDialogProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
    toast({
      title: "Files added",
      description: `${acceptedFiles.length} file(s) ready for upload.`
    });
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    }
  });

  const handleUpload = () => {
    // Here you would typically handle the actual upload
    toast({
      title: "Upload successful",
      description: `${files.length} file(s) have been uploaded.`
    });
    setFiles([]);
    onOpenChange(false);
  };

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter(file => file !== fileToRemove));
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
                ? "Drop your files here..."
                : "Drag & drop files here, or click to select"}
            </p>
            <p className="text-sm text-white/60 mt-2">
              Supported: Images and PDFs
            </p>
          </div>

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
              <Microsoft className="w-4 h-4" />
              OneDrive
            </Button>
          </div>

          {files.length > 0 && (
            <div className="mt-6 space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <File className="w-4 h-4 text-white/60" />
                    <span className="text-sm text-white/80 truncate max-w-[200px]">
                      {file.name}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(file)}
                    className="text-white/60 hover:text-white/90"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              <Button 
                onClick={handleUpload} 
                className="w-full mt-4 bg-primary hover:bg-primary/90"
              >
                Upload {files.length} file{files.length !== 1 ? 's' : ''}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUploadDialog;