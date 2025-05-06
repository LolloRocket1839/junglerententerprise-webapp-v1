import { BrowserRouter as Router, Routes, Route, Suspense } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/navigation/Navigation';
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from './lib/react-query';
import './App.css';

// Lazy load routes
const Index = React.lazy(() => import('./pages/Index'));
const Invest = React.lazy(() => import('./pages/Invest'));
const Rent = React.lazy(() => import('./pages/Rent'));
const Stay = React.lazy(() => import('./pages/Stay'));
const Referral = React.lazy(() => import('./pages/Referral'));
const ListRoom = React.lazy(() => import('./pages/ListRoom'));
const Marketplace = React.lazy(() => import('./pages/Marketplace'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router>
          <Navigation />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/invest" element={<Invest />} />
              <Route path="/rent" element={<Rent />} />
              <Route path="/stay" element={<Stay />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/list-room" element={<ListRoom />} />
              <Route path="/marketplace" element={<Marketplace />} />
            </Routes>
          </Suspense>
          <Toaster />
        </Router>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
