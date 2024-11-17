import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="text-xl font-bold text-primary">
                Jungle Rent
              </Link>
              <div className="flex gap-4">
                <Button variant="ghost" asChild className="text-secondary">
                  <Link to="/invest">Invest</Link>
                </Button>
                <Button variant="ghost" asChild className="text-secondary">
                  <Link to="/rent">Rent</Link>
                </Button>
                <Button variant="ghost" asChild className="text-secondary">
                  <Link to="/stay">Stay</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;