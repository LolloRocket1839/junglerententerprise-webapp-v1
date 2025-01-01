import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Index from "./pages/Index";
import Invest from "./pages/Invest";
import Stay from "./pages/Stay";
import Rent from "./pages/Rent";
import Referral from "./pages/Referral";
import JungleHelp from "./components/chat/JungleHelp";
import ListRoom from "./pages/ListRoom";
import StudentDashboard from "./components/rent/StudentDashboard";
import Auth from "./components/auth/Auth";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/invest" element={<Invest />} />
              <Route path="/rent" element={<Rent />} />
              <Route path="/stay" element={<Stay />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/list-room" element={<ListRoom />} />
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </div>
          <JungleHelp />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;