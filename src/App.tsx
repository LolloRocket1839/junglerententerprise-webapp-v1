
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/navigation/Navigation';
import Index from './pages/Index';
import Invest from './pages/Invest';
import Rent from './pages/Rent';
import Stay from './pages/Stay';
import Student from './pages/Student';
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
          <div className="relative min-h-screen">
            <Navigation />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/invest" element={<Invest />} />
              <Route path="/rent" element={<Rent />} />
              <Route path="/stay" element={<Stay />} />
              <Route path="/student" element={<Student />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/list-room" element={<ListRoom />} />
              <Route path="/marketplace" element={<Marketplace />} />
            </Routes>
            <img 
              src="/lovable-uploads/a98c58cf-b80e-442f-964d-95eedfaa8f48.png"
              alt="Jungle Rent Logo"
              className="fixed bottom-4 right-4 w-16 h-16 md:w-24 md:h-24 z-50"
            />
            <Toaster />
          </div>
        </Router>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
