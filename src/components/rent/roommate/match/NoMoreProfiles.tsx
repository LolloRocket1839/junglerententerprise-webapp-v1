import { Button } from "@/components/ui/button";

interface NoMoreProfilesProps {
  onRestart: () => void;
}

const NoMoreProfiles = ({ onRestart }: NoMoreProfilesProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <h3 className="text-xl font-semibold mb-2">Nessun altro profilo!</h3>
      <p className="text-muted-foreground">Torna più tardi per nuovi potenziali match.</p>
      <Button 
        className="mt-4"
        onClick={onRestart}
      >
        Ricomincia
      </Button>
    </div>
  );
};

export default NoMoreProfiles;