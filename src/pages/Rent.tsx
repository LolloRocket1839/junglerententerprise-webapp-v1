import { RoommateMatching } from "@/components/rent/roommate/RoommateMatching";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserHeartIcon } from "lucide-react";

export default function Rent() {
  return (
    <div className="min-h-screen bg-background">
      <Tabs defaultValue="listings" className="container mx-auto py-8">
        <TabsList className="w-full justify-start gap-2 bg-transparent">
          <TabsTrigger value="listings" className="data-[state=active]:bg-primary/20">
            Listings
          </TabsTrigger>
          <TabsTrigger value="roommate" className="data-[state=active]:bg-primary/20">
            <UserHeartIcon className="w-4 h-4 mr-2" />
            Find a Roommate
          </TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="mt-6">
          <div className="container mx-auto py-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold text-center mb-8 text-primary">
                Available Rentals
              </h1>
              {/* Here you would typically map through your rental listings and display them */}
              {/* Example rental listing */}
              <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 shadow-xl">
                <h2 className="text-xl font-semibold">Room in City Center</h2>
                <p className="text-gray-300">€650/month</p>
                <p className="text-gray-400">Available from January 1st</p>
              </div>
              {/* ... add more listings as needed */}
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
