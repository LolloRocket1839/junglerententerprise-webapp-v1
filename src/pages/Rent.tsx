
import { RoommateMatching } from "@/components/rent/roommate/RoommateMatching";
import { SearchForm } from "@/components/rent/components/SearchForm";
import { StreetMockups } from "@/components/rent/components/StreetMockups";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart } from "lucide-react";

export default function Rent() {
  return (
    <div className="min-h-screen bg-background">
      <Tabs defaultValue="listings" className="container mx-auto py-8">
        <TabsList className="w-full justify-start gap-2 bg-transparent">
          <TabsTrigger value="listings" className="data-[state=active]:bg-primary/20">
            Listings
          </TabsTrigger>
          <TabsTrigger value="roommate" className="data-[state=active]:bg-primary/20">
            <Heart className="w-4 h-4 mr-2" />
            Find a Roommate
          </TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="mt-6">
          <div className="container mx-auto py-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold text-center mb-8 text-primary">
                Affitta vicino all'università
              </h1>
              <SearchForm 
                searchParams={{}}
                setSearchParams={() => {}}
                showFilters={false}
                setShowFilters={() => {}}
                handleSearch={() => {}}
              />
              <div className="mt-12">
                <StreetMockups />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="roommate" className="mt-6">
          <RoommateMatching />
        </TabsContent>
      </Tabs>
    </div>
  );
}
