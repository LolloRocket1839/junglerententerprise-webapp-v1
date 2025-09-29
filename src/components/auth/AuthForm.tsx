import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { RoleSelection } from './RoleSelection';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff } from 'lucide-react';
import type { UserType } from '@/types/auth';

export function AuthForm() {
  console.log('[AuthForm] Rendering');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState<UserType>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { session, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  // Redirect if already authenticated
  useEffect(() => {
    console.log('[AuthForm] Session check:', { session: !!session, authLoading });
    if (session && !authLoading) {
      const from = location.state?.from?.pathname || '/dashboard';
      console.log('[AuthForm] Redirecting to:', from);
      navigate(from, { replace: true });
    }
  }, [session, authLoading, navigate, location]);

  if (authLoading) {
    console.log('[AuthForm] Auth is loading...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Errore",
        description: "Le password non coincidono",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          data: {
            first_name: firstName,
            last_name: lastName,
            initial_role: userType
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Registrazione completata",
        description: "Ti abbiamo inviato una email di conferma"
      });
      
      navigate('/');
    } catch (error: any) {
      const friendlyMessage = error.message.includes('User already registered') 
        ? "Questo indirizzo email è già registrato. Prova ad accedere." 
        : error.message.includes('Password should be at least')
        ? "La password deve essere di almeno 6 caratteri."
        : error.message;
        
      toast({
        title: "Errore durante la registrazione",
        description: friendlyMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    console.log('🔍 Sign in clicked - email:', email, 'password length:', password.length);
    setIsLoading(true);
    
    try {
      console.log('🔄 Attempting Supabase sign in...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      console.log('📝 Supabase response:', { data: data?.user?.email, error: error?.message });
      
      if (error) throw error;
      
      toast({
        title: "Accesso effettuato",
        description: "Benvenuto su Jungle Rent!"
      });
      
      console.log('✅ Sign in successful, navigating...');
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error('❌ Sign in error:', error);
      const friendlyMessage = error.message.includes('Invalid login credentials')
        ? "Email o password non corretti. Riprova."
        : error.message.includes('Email not confirmed')
        ? "Verifica la tua email prima di accedere."
        : error.message;
        
      toast({
        title: "Errore durante l'accesso",
        description: friendlyMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }


  async function handleTestLogin() {
    console.log('🧪 Test login clicked');
    setIsLoading(true);
    try {
      console.log('🔄 Attempting test login with test@jungle.com');
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@jungle.com',
        password: 'test123456'
      });
      
      console.log('📝 Test login response:', { data: data?.user?.email, error: error?.message });
      
      if (error) throw error;
      
      toast({
        title: "Test login effettuato",
        description: "Accesso con account di test"
      });
      
      console.log('✅ Test login successful, navigating...');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('❌ Test login error:', error);
      toast({
        title: "Errore test login",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }

  console.log('🎨 Rendering AuthForm - session:', !!session, 'loading:', isLoading);

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Jungle Rent</h1>
        <p className="text-muted-foreground mt-2">La tua piattaforma immobiliare</p>
      </div>

      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Accedi</TabsTrigger>
          <TabsTrigger value="signup">Registrati</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Accedi al tuo account</CardTitle>
              <CardDescription>
                Inserisci le tue credenziali per accedere
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="La tua email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="La tua password"
                      className="pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Accesso in corso...' : 'Accedi'}
                </Button>
              </form>

              <div className="mt-4">
                <Button 
                  variant="outline" 
                  onClick={handleTestLogin}
                  className="w-full"
                  disabled={isLoading}
                >
                  Accesso Test (Demo)
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Crea il tuo account</CardTitle>
              <CardDescription>
                Seleziona il tuo profilo e registrati
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RoleSelection 
                onRoleSelect={(role) => setUserType(role as UserType)}
                selectedRole={userType}
              />

              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Il tuo nome"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Cognome</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Il tuo cognome"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="La tua email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Scegli una password"
                      className="pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Conferma Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Conferma la password"
                      className="pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Registrazione in corso...' : 'Registrati'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}