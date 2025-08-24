import React from 'react';
import { Button } from "@/components/ui/button";
import { ImageIcon } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface PropertyGalleryProps {
  images: string[];
  currentImageIndex: number;
  onToggleImage: () => void;
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({
  images,
  currentImageIndex,
  onToggleImage
}) => {
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden group">
      <ImageWithFallback
        src={images?.[currentImageIndex]}
        alt={`Property view ${currentImageIndex === 0 ? 'Exterior' : 'Interior'}`}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {images && images.length > 1 && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70"
          onClick={onToggleImage}
        >
          <ImageIcon className="w-4 h-4" />
        </Button>
      )}
      <div className="absolute top-2 left-2 bg-black/50 px-2 py-1 rounded text-xs text-white">
        {currentImageIndex === 0 ? 'Esterno' : 'Interno'}
      </div>
    </div>
  );
};

export default PropertyGallery;