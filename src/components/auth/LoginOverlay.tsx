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
    navigate('/');
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Login Attempted`,
      description: "Social login will be implemented soon.",
    });
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/40">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        w-full max-w-md mx-4 glass rounded-2xl shadow-2xl animate-scale-in">
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

          <div className="space-y-4 mb-6">
            <Button
              type="button"
              variant="outline"
              className="w-full bg-white/10 hover:bg-white/15 text-white border-white/10"
              onClick={() => handleSocialLogin('Google')}
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full bg-white/10 hover:bg-white/15 text-white border-white/10"
              onClick={() => handleSocialLogin('Apple')}
            >
              <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-5 h-5 mr-2" />
              Continue with Apple
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full bg-white/10 hover:bg-white/15 text-white border-white/10"
              onClick={() => handleSocialLogin('Microsoft')}
            >
              <img src="https://www.microsoft.com/favicon.ico" alt="Microsoft" className="w-5 h-5 mr-2" />
              Continue with Microsoft
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-4 text-white/40 font-medium tracking-wider hover:text-primary transition-colors duration-200 flex items-center gap-2">
                  <span className="w-6 h-px bg-white/10"></span>
                  Continue with Email
                  <span className="w-6 h-px bg-white/10"></span>
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                University/Professional/Personal Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-primary"
                  placeholder="user@domain.com"
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
              type="submit"
              className="w-full"
            >
              <span>Sign In</span>
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
