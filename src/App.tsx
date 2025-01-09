import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Index from "./pages/Index";
import Invest from "./pages/Invest";
import Rent from "./pages/Rent";
import Stay from "./pages/Stay";
import Referral from "./pages/Referral";
import ListRoom from "./pages/ListRoom";
import MarketplaceGrid from "./components/marketplace/MarketplaceGrid";

function App() {
  return (
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
  );
}

export default App;