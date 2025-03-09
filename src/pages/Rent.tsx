
import { RoommateMatching } from "@/components/rent/roommate/RoommateMatching";
import { SearchForm } from "@/components/rent/components/SearchForm";
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
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold text-center mb-8 text-primary">
                Available Rentals
              </h1>
              {/* Mock rental listings with the site's glass card style */}
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h2 className="text-xl font-semibold">Modern Studio in City Center</h2>
                  <p className="text-gray-300">€850/month</p>
                  <p className="text-gray-400">Available from February 1st</p>
                  <div className="flex gap-2 mt-4">
                    <span className="px-2 py-1 rounded-full bg-primary/20 text-sm">Furnished</span>
                    <span className="px-2 py-1 rounded-full bg-primary/20 text-sm">Studio</span>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h2 className="text-xl font-semibold">Cozy Room in Shared Apartment</h2>
                  <p className="text-gray-300">€650/month</p>
                  <p className="text-gray-400">Available from January 15th</p>
                  <div className="flex gap-2 mt-4">
                    <span className="px-2 py-1 rounded-full bg-primary/20 text-sm">Shared</span>
                    <span className="px-2 py-1 rounded-full bg-primary/20 text-sm">All Bills Included</span>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h2 className="text-xl font-semibold">Spacious Room near University</h2>
                  <p className="text-gray-300">€700/month</p>
                  <p className="text-gray-400">Available Immediately</p>
                  <div className="flex gap-2 mt-4">
                    <span className="px-2 py-1 rounded-full bg-primary/20 text-sm">Student Friendly</span>
                    <span className="px-2 py-1 rounded-full bg-primary/20 text-sm">Close to Campus</span>
                  </div>
                </div>
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
