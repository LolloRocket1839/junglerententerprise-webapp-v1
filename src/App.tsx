
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './contexts/LanguageContext';
import JungleRentApp from './components/JungleRentApp';
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
            <JungleRentApp />
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
