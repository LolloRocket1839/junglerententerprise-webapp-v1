
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/navigation/Navigation';
import Index from './pages/Index';
import Invest from './pages/Invest';
import Rent from './pages/Rent';
import Stay from './pages/Stay';
import Referral from './pages/Referral';
import ListRoom from './pages/ListRoom';
import Marketplace from './pages/Marketplace';
import { Toaster } from "@/components/ui/toaster";
import './App.css';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/stay" element={<Stay />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/list-room" element={<ListRoom />} />
            <Route path="/marketplace" element={<Marketplace />} />
          </Routes>
          <Toaster />
        </Router>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
