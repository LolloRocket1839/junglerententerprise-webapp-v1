import { Loader2 } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
};

export default LoadingState;