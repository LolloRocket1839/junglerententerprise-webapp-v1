import { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { Button } from './button';
import { useToast } from './use-toast';

interface FileUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFilesUploaded?: (files: File[]) => void;
  allowedTypes?: string[];
  maxFiles?: number;
}

const FileUploadDialog = ({
  open,
  onOpenChange,
  onFilesUploaded,
  allowedTypes = ['image/*', 'application/pdf'],
  maxFiles = 5
}: FileUploadDialogProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length + files.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `You can only upload up to ${maxFiles} files at once.`,
        variant: "destructive"
      });
      return;
    }
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, [files.length, maxFiles, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles
  });

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  const handleUpload = () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically upload the files to your server
    onFilesUploaded?.(files);
    toast({
      title: "Files uploaded successfully",
      description: `${files.length} file(s) have been uploaded.`
    });
    setFiles([]);
    onOpenChange(false);
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
                ? "Drop the files here..."
                : "Drag 'n' drop files here, or click to select files"}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Supported files: Images and PDFs (max {maxFiles} files)
            </p>
          </div>

          {files.length > 0 && (
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

          <Button onClick={handleUpload} className="w-full">
            Upload {files.length} file{files.length !== 1 ? 's' : ''}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadDialog;