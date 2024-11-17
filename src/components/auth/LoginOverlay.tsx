import React, { useState } from 'react';
import { MessageCircle, Mail, Lock, ArrowRight, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

const LoginOverlay = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login Attempted",
      description: "This is a demo. Login functionality will be implemented soon.",
    });
  };

  const handleClose = () => {
    navigate(-1); // This will go back to the previous page
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-green-900/40 animate-fade-in">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        w-full max-w-md mx-4 bg-white/10 backdrop-blur-lg
        rounded-2xl border border-white/20 shadow-xl
        animate-scale-in">
        {/* Close Button - Now visible on all screen sizes */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 text-white/60 hover:text-white"
          onClick={handleClose}
        >
          <X className="h-6 w-6" />
        </Button>

        <div className="p-8">
          <div className="text-center mb-8 animate-float-slower">
            <h2 className="text-3xl font-bold text-white mb-2">
              Join Jungle Rent
            </h2>
            <p className="text-white/60">
              Your Student Housing Journey Begins Here
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                University Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-primary"
                  placeholder="student@university.edu"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-primary"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full bg-white/10 hover:bg-white/15 text-white border-white/10"
            >
              <img src="/placeholder.svg" alt="University" className="w-5 h-5 rounded mr-2" />
              Sign in with University SSO
            </Button>

            <Button
              type="submit"
              className="w-full"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/40 text-sm">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>

      <Button
        variant="default"
        className="fixed bottom-8 right-8 rounded-full shadow-lg flex items-center gap-2 z-50"
      >
        <MessageCircle className="w-6 h-6" />
        <span>Jungle Help 24/7</span>
      </Button>
    </div>
  );
};

export default LoginOverlay;
