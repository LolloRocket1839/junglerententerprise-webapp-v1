
import { RoommateMatching } from "@/components/rent/roommate/RoommateMatching";
import { SearchForm } from "@/components/rent/components/SearchForm";
import { SearchParams } from "@/components/rent/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { GradientBackground } from "@/components/ui/gradient-background";

export default function Rent() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    city: '',
    university: '',
    roomType: '',
    minPrice: '',
    maxPrice: '',
    moveInDate: '',
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    if (!searchParams.city || !searchParams.university) {
      toast({
        title: "Inserisci i dati richiesti",
        description: "Per favore seleziona una città e un'università per continuare la ricerca.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Ricerca in corso",
      description: "Stiamo cercando le migliori opzioni per te...",
    });
    
    console.log("Searching with params:", searchParams);
  };

  return (
    <GradientBackground className="min-h-screen bg-background">
      <Tabs defaultValue="listings" className="container mx-auto py-8">
        <TabsList className="w-full justify-start gap-2 bg-white/5 backdrop-blur-sm border border-white/10 p-1 rounded-xl">
          <TabsTrigger 
            value="listings" 
            className="data-[state=active]:bg-primary/20 data-[state=active]:backdrop-blur-xl transition-all duration-300 hover:bg-white/5"
          >
            <Search className="w-4 h-4 mr-2" />
            Affitta
          </TabsTrigger>
          <TabsTrigger 
            value="roommate" 
            className="data-[state=active]:bg-primary/20 data-[state=active]:backdrop-blur-xl transition-all duration-300 hover:bg-white/5"
          >
            <Heart className="w-4 h-4 mr-2" />
            Trova Coinquilino
          </TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="mt-6 animate-fade-in">
          <SearchForm 
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            handleSearch={handleSearch}
          />
        </TabsContent>

        <TabsContent value="roommate" className="mt-6 animate-fade-in">
          <RoommateMatching />
        </TabsContent>
      </Tabs>
    </GradientBackground>
  );
}
