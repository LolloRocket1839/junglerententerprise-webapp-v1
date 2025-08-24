import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

interface UploadProgress {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  result?: string;
  error?: string;
}

interface UseStorageUploadOptions {
  maxSizeMB?: number;
  maxDimension?: number;
  quality?: number;
}

interface UploadResult {
  publicUrl?: string;
  filePath: string;
  success: boolean;
  error?: string;
}

export const useStorageUpload = (bucket: string, prefix?: string, options: UseStorageUploadOptions = {}) => {
  const { session } = useAuth();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress[]>([]);

  const {
    maxSizeMB = 10,
    maxDimension = 1600,
    quality = 0.8
  } = options;

  // Compress image client-side
  const compressImage = useCallback(async (file: File): Promise<File> => {
    if (!file.type.startsWith('image/')) return file;

    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        const maxDim = maxDimension;
        
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = (height * maxDim) / width;
            width = maxDim;
          } else {
            width = (width * maxDim) / height;
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        }, file.type, quality);
      };

      img.onerror = () => resolve(file);
      img.src = URL.createObjectURL(file);
    });
  }, [maxDimension, quality]);

  // Validate file
  const validateFile = useCallback((file: File): string | null => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File troppo grande. Massimo ${maxSizeMB}MB`;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      return 'Tipo file non supportato';
    }

    return null;
  }, [maxSizeMB]);

  // Generate unique file path
  const generateFilePath = useCallback((file: File): string => {
    if (!session?.user) throw new Error('User not authenticated');
    
    const ext = file.name.split('.').pop();
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    const userId = session.user.id;
    
    const parts = [userId];
    if (prefix) parts.push(prefix);
    parts.push(`${timestamp}-${random}.${ext}`);
    
    return parts.join('/');
  }, [session, prefix]);

  // Upload single file
  const uploadSingleFile = useCallback(async (file: File): Promise<UploadResult> => {
    try {
      // Validate
      const error = validateFile(file);
      if (error) throw new Error(error);

      // Compress if image
      const processedFile = await compressImage(file);
      
      // Generate path
      const filePath = generateFilePath(processedFile);

      // Upload to Supabase
      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, processedFile, {
          contentType: processedFile.type,
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL for public buckets
      let publicUrl: string | undefined;
      try {
        const { data: { publicUrl: url } } = supabase.storage
          .from(bucket)
          .getPublicUrl(data.path);
        publicUrl = url;
      } catch {
        // Bucket is private, no public URL
      }

      return {
        publicUrl,
        filePath: data.path,
        success: true
      };

    } catch (error) {
      console.error('Upload error:', error);
      return {
        filePath: '',
        success: false,
        error: error instanceof Error ? error.message : 'Errore upload'
      };
    }
  }, [bucket, validateFile, compressImage, generateFilePath]);

  // Upload multiple files with progress
  const uploadFiles = useCallback(async (files: File[]): Promise<UploadResult[]> => {
    if (!session?.user) {
      toast({
        title: "Errore",
        description: "Devi essere autenticato per caricare file",
        variant: "destructive"
      });
      return [];
    }

    setUploading(true);
    
    // Initialize progress
    const initialProgress = files.map(file => ({
      file,
      progress: 0,
      status: 'pending' as const
    }));
    setProgress(initialProgress);

    const results: UploadResult[] = [];

    try {
      // Upload files sequentially to avoid overwhelming
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Update progress - uploading
        setProgress(prev => prev.map((p, index) => 
          index === i ? { ...p, status: 'uploading', progress: 50 } : p
        ));

        const result = await uploadSingleFile(file);
        results.push(result);

        // Update progress - completed or error
        setProgress(prev => prev.map((p, index) => 
          index === i ? {
            ...p,
            status: result.success ? 'completed' : 'error',
            progress: 100,
            result: result.success ? (result.publicUrl || result.filePath) : undefined,
            error: result.error
          } : p
        ));

        // Small delay to show progress
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const successCount = results.filter(r => r.success).length;
      const errorCount = results.length - successCount;

      if (successCount > 0) {
        toast({
          title: "Upload completato!",
          description: `${successCount} file caricati con successo${errorCount > 0 ? `, ${errorCount} errori` : ''}`
        });
      }

      if (errorCount === results.length) {
        toast({
          title: "Errore upload",
          description: "Nessun file è stato caricato",
          variant: "destructive"
        });
      }

    } catch (error) {
      console.error('Upload batch error:', error);
      toast({
        title: "Errore",
        description: "Errore durante l'upload dei file",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }

    return results;
  }, [session, uploadSingleFile, toast]);

  // Reset progress
  const resetProgress = useCallback(() => {
    setProgress([]);
  }, []);

  return {
    uploadFiles,
    uploadSingleFile,
    uploading,
    progress,
    resetProgress,
    validateFile
  };
};