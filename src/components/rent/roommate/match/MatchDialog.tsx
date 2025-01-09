import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MatchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MatchDialog = ({ isOpen, onClose, children }: MatchDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <DialogTitle className="sr-only">Mix & Match</DialogTitle>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="h-[600px] relative overflow-hidden">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MatchDialog;