// Cache-busting refresh - Build 2025.1
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, lazy } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import MainNavigation from './components/navigation/MainNavigation';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { MobileTabNavigation } from './components/mobile/MobileTabNavigation';
import { Toaster } from "@/components/ui/toaster";
import './App.css';

// Lazy load route components for code splitting
const Index = lazy(() => import('./pages/Index'));
const Invest = lazy(() => import('./pages/Invest'));
const Rent = lazy(() => import('./pages/Rent'));
const Stay = lazy(() => import('./pages/Stay'));
const Referral = lazy(() => import('./pages/Referral'));
const Properties = lazy(() => import('./pages/Properties'));
const ListRoom = lazy(() => import('./pages/ListRoom'));
const Marketplace = lazy(() => import('./pages/Marketplace'));
const Admin = lazy(() => import('./pages/Admin'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AuthForm = lazy(() => import('./components/auth/AuthForm').then(m => ({ default: m.AuthForm })));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  console.log('[App] Rendering app...');
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LanguageProvider>
            <Router>
              <MainNavigation />
              <Suspense fallback={<PageLoader />}>
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
              </Suspense>
              <MobileTabNavigation />
              <Toaster />
            </Router>
          </LanguageProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
