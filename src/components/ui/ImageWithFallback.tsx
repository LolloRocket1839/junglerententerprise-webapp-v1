import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string | null;
  fallback?: React.ReactNode;
  className?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = '',
  fallback,
  className,
  loading = 'lazy',
  decoding = 'async',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  // Show fallback if no src, has error, or custom fallback provided
  const shouldShowFallback = !src || hasError;

  if (shouldShowFallback) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className={cn(
        "flex items-center justify-center bg-muted rounded-lg",
        className
      )}>
        <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={cn(
          "flex items-center justify-center bg-muted rounded-lg animate-pulse",
          className
        )}>
          <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
        </div>
      )}
      <img
        {...props}
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={cn(className, isLoading && 'hidden')}
        onError={handleError}
        onLoad={handleLoad}
      />
    </>
  );
};

export default ImageWithFallback;