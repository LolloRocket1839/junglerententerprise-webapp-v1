import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FileUploadDialog from '../../ui/FileUploadDialog';

interface SwapHeaderProps {
  isUploadOpen: boolean;
  setIsUploadOpen: (open: boolean) => void;
  onFilesUploaded: (files: File[]) => void;
}

const SwapHeader = ({ isUploadOpen, setIsUploadOpen, onFilesUploaded }: SwapHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-semibold text-white">Swap Opportunities</h3>
      <div className="flex gap-2">
        <Button 
          variant="default" 
          className="glass-button"
          onClick={() => setIsUploadOpen(true)}
        >
          Upload Files
        </Button>
        <Button variant="default" className="glass-button" asChild>
          <Link to="/list-room">List New Item</Link>
        </Button>
      </div>
      <FileUploadDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onFilesUploaded={onFilesUploaded}
      />
    </div>
  );
};

export default SwapHeader;