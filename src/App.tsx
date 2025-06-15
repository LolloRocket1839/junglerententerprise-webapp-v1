
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/navigation/Navigation';
import { Toaster } from "@/components/ui/toaster";
import './App.css';
import PreferenceProfilingGame from './components/quiz/PreferenceProfilingGame';
import RoommatePreferencesForm from './components/roommate/RoommatePreferencesForm';

// Lazy load routes
const Index = React.lazy(() => import('./pages/Index'));
const Invest = React.lazy(() => import('./pages/Invest'));
const Rent = React.lazy(() => import('./pages/Rent'));
const Stay = React.lazy(() => import('./pages/Stay'));
const Referral = React.lazy(() => import('./pages/Referral'));
const ListRoom = React.lazy(() => import('./pages/ListRoom'));
const Marketplace = React.lazy(() => import('./pages/Marketplace'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));
const StudentProfile = React.lazy(() => import('./pages/StudentProfile'));
const RoommateMatching = React.lazy(() => import('./pages/RoommateMatching'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <LanguageProvider>
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
          <Route path="/marketplace/product/:id" element={<ProductDetail />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/roommate-matching" element={<RoommateMatching />} />
          <Route path="/student/preference-profiling" element={<PreferenceProfilingGame />} />
          <Route path="/student/roommate-preferences" element={<RoommatePreferencesForm />} />
        </Routes>
      </Suspense>
      <Toaster />
    </LanguageProvider>
  );
}

export default App;
