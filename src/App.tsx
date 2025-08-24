
// Cache-busting refresh - Build 2025.3 - CLEAN SLATE
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthProvider';
import TopNav from './components/navigation/TopNav';
import Index from './pages/Index';
import Invest from './pages/Invest';
import Rent from './pages/Rent';
import Stay from './pages/Stay';
import Referral from './pages/Referral';
import Properties from './pages/Properties';
import ListRoom from './pages/ListRoom';
import Marketplace from './pages/Marketplace';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import { AuthForm } from './components/auth/AuthForm';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { MobileTabNavigation } from './components/mobile/MobileTabNavigation';
import { Toaster } from "@/components/ui/toaster";
import './App.css';

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
      <AuthProvider>
        <LanguageProvider>
          <Router>
            <TopNav />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthForm />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/invest" element={
                <ProtectedRoute>
                  <Invest />
                </ProtectedRoute>
              } />
              <Route path="/rent" element={
                <ProtectedRoute>
                  <Rent />
                </ProtectedRoute>
              } />
              <Route path="/stay" element={
                <ProtectedRoute>
                  <Stay />
                </ProtectedRoute>
              } />
              <Route path="/referral" element={
                <ProtectedRoute>
                  <Referral />
                </ProtectedRoute>
              } />
              <Route path="/list-room" element={
                <ProtectedRoute>
                  <ListRoom />
                </ProtectedRoute>
              } />
              <Route path="/marketplace" element={
                <ProtectedRoute>
                  <Marketplace />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute requireEmailVerification={true}>
                  <Dashboard />
                </ProtectedRoute>
              } />
            </Routes>
            <MobileTabNavigation />
            <Toaster />
          </Router>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
