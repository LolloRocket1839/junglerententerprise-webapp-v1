import { useState } from 'react';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

export interface CameraOptions {
  quality?: number;
  allowEditing?: boolean;
  resultType?: CameraResultType;
  source?: CameraSource;
}

export function useCamera() {
  const [isCapturing, setIsCapturing] = useState(false);

  const takePicture = async (options: CameraOptions = {}): Promise<Photo | null> => {
    if (!Capacitor.isNativePlatform()) {
      // Fallback per web browser
      return await takePictureWeb();
    }

    try {
      setIsCapturing(true);
      
      const image = await Camera.getPhoto({
        quality: options.quality || 90,
        allowEditing: options.allowEditing || true,
        resultType: options.resultType || CameraResultType.DataUrl,
        source: options.source || CameraSource.Camera,
      });

      return image;
    } catch (error) {
      console.error('Error taking picture:', error);
      return null;
    } finally {
      setIsCapturing(false);
    }
  };

  const takePictureWeb = async (): Promise<Photo | null> => {
    try {
      setIsCapturing(true);
      
      // Crea un input file per simulare la camera su web
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment'; // Usa camera posteriore se disponibile
      
      return new Promise((resolve) => {
        input.onchange = (event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({
                webPath: reader.result as string,
                dataUrl: reader.result as string,
                format: file.type.split('/')[1] as any,
                saved: false
              });
            };
            reader.readAsDataURL(file);
          } else {
            resolve(null);
          }
        };
        
        input.oncancel = () => resolve(null);
        input.click();
      });
    } catch (error) {
      console.error('Error taking picture on web:', error);
      return null;
    } finally {
      setIsCapturing(false);
    }
  };

  const selectFromGallery = async (): Promise<Photo | null> => {
    try {
      setIsCapturing(true);
      
      if (!Capacitor.isNativePlatform()) {
        return await selectFromGalleryWeb();
      }

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });

      return image;
    } catch (error) {
      console.error('Error selecting from gallery:', error);
      return null;
    } finally {
      setIsCapturing(false);
    }
  };

  const selectFromGalleryWeb = async (): Promise<Photo | null> => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      
      return new Promise((resolve) => {
        input.onchange = (event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({
                webPath: reader.result as string,
                dataUrl: reader.result as string,
                format: file.type.split('/')[1] as any,
                saved: false
              });
            };
            reader.readAsDataURL(file);
          } else {
            resolve(null);
          }
        };
        
        input.oncancel = () => resolve(null);
        input.click();
      });
    } catch (error) {
      console.error('Error selecting from gallery on web:', error);
      return null;
    }
  };

  return {
    takePicture,
    selectFromGallery,
    isCapturing
  };
}