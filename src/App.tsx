import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Rent from "./pages/Rent";
import Stay from "./pages/Stay";
import Invest from "./pages/Invest";
import ListRoom from "./pages/ListRoom";
import Referral from "./pages/Referral";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/stay" element={<Stay />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/list-room" element={<ListRoom />} />
        <Route path="/referral" element={<Referral />} />
      </Routes>
    </Router>
  );
}

export default App;