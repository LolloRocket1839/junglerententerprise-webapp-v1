import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function DemoBanner() {
  return (
    <Alert className="fixed bottom-4 right-4 z-50 w-auto max-w-md bg-gradient-to-r from-blue-500/90 to-purple-500/90 border-none text-white shadow-2xl">
      <AlertCircle className="h-5 w-5" />
      <AlertDescription className="ml-2">
        <strong>Demo Mode:</strong> This is a public demo. All features are viewable without authentication.
      </AlertDescription>
    </Alert>
  );
}
