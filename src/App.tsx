import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "./components/navigation/Navigation";
import Index from "./pages/Index";
import Invest from "./pages/Invest";
import Rent from "./pages/Rent";
import Stay from "./pages/Stay";
import Referral from "./pages/Referral";
import ListRoom from "./pages/ListRoom";
import MarketplaceGrid from "./components/marketplace/MarketplaceGrid";

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
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/invest" element={<Invest />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/stay" element={<Stay />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/list-room" element={<ListRoom />} />
          <Route path="/marketplace" element={<MarketplaceGrid />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;