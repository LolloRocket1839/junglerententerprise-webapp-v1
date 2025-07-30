import React, { useState } from 'react';
import { Camera, Image, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCamera } from '@/hooks/useCamera';
import { useToast } from '@/hooks/use-toast';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface CameraUploadProps {
  onImageCapture: (imageDataUrl: string) => void;
  onClose: () => void;
  isOpen: boolean;
  title?: string;
  description?: string;
}

export function CameraUpload({ 
  onImageCapture, 
  onClose, 
  isOpen, 
  title = "Carica Documento",
  description = "Scatta una foto o seleziona dalla galleria"
}: CameraUploadProps) {
  const { takePicture, selectFromGallery, isCapturing } = useCamera();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleTakePicture = async () => {
    try {
      const photo = await takePicture({
        quality: 80,
        allowEditing: true
      });
      
      if (photo?.dataUrl) {
        setPreviewImage(photo.dataUrl);
      }
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile scattare la foto",
        variant: "destructive"
      });
    }
  };

  const handleSelectFromGallery = async () => {
    try {
      const photo = await selectFromGallery();
      
      if (photo?.dataUrl) {
        setPreviewImage(photo.dataUrl);
      }
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile selezionare l'immagine",
        variant: "destructive"
      });
    }
  };

  const handleConfirm = () => {
    if (previewImage) {
      onImageCapture(previewImage);
      setPreviewImage(null);
      onClose();
      
      toast({
        title: "Successo",
        description: "Documento caricato correttamente"
      });
    }
  };

  const handleCancel = () => {
    setPreviewImage(null);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-lg font-bold">{title}</SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground">
                {description}
              </SheetDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="rounded-full h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 py-6">
          {previewImage ? (
            <div className="space-y-4">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-64 object-cover"
                  />
                </CardContent>
              </Card>
              
              <div className="flex gap-3">
                <Button
                  onClick={() => setPreviewImage(null)}
                  variant="outline"
                  className="flex-1"
                >
                  Riprova
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="flex-1"
                >
                  Conferma
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center py-8">
                <Upload className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Scegli come vuoi caricare il documento
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleTakePicture}
                  disabled={isCapturing}
                  className="w-full h-14 text-lg rounded-xl"
                  size="lg"
                >
                  <Camera className="h-6 w-6 mr-3" />
                  {isCapturing ? 'Scattando...' : 'Scatta Foto'}
                </Button>

                <Button
                  onClick={handleSelectFromGallery}
                  disabled={isCapturing}
                  variant="outline"
                  className="w-full h-14 text-lg rounded-xl"
                  size="lg"
                >
                  <Image className="h-6 w-6 mr-3" />
                  Scegli dalla Galleria
                </Button>
              </div>

              <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">💡 Suggerimenti per una foto perfetta:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Assicurati che il documento sia ben illuminato</li>
                  <li>• Mantieni il telefono parallelo al documento</li>
                  <li>• Evita riflessi e ombre</li>
                  <li>• Tutti i bordi del documento devono essere visibili</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}