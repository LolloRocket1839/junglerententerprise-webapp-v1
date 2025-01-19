import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "@/components/navigation/Navigation";
import Index from "@/pages/Index";
import Invest from "@/pages/Invest";
import Rent from "@/pages/Rent";
import Stay from "@/pages/Stay";
import Student from "@/pages/Student";
import Auth from "@/components/auth/Auth";
import ListRoom from "@/pages/ListRoom";
import Referral from "@/pages/Referral";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="app-container">
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/stay" element={<Stay />} />
            <Route path="/student" element={<Student />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/list-room" element={<ListRoom />} />
            <Route path="/referral" element={<Referral />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;