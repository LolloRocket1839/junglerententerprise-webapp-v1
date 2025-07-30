
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/navigation/Navigation';
import Index from './pages/Index';
import Invest from './pages/Invest';
import Rent from './pages/Rent';
import Stay from './pages/Stay';
import Referral from './pages/Referral';
import Properties from './pages/Properties';
import ListRoom from './pages/ListRoom';
import Marketplace from './pages/Marketplace';
import Dashboard from './pages/Dashboard';
import { AuthForm } from './components/auth/AuthForm';
import { MobileTabNavigation } from './components/mobile/MobileTabNavigation';
import { Toaster } from "@/components/ui/toaster";
import './App.css';

// Create a client
const queryClient = new QueryClient();

function App() {
  console.log('App component rendering with unified properties system');
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/stay" element={<Stay />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/list-room" element={<ListRoom />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/auth" element={<AuthForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <MobileTabNavigation />
          <Toaster />
        </Router>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
