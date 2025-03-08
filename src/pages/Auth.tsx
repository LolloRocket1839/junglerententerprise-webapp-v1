
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { RoleSelection } from '@/components/auth/RoleSelection';
import { useToast } from '@/hooks/use-toast';
import type { UserRole } from '@/types/auth';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const navigate = useNavigate();
  const { toast } = useToast();

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            initial_role: role
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
      toast({
        title: "Errore durante la registrazione",
        description: error.message,
        variant: "destructive"
      });
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Registrati</h1>
          <p className="text-muted-foreground">Seleziona il tuo ruolo per iniziare</p>
        </div>

        <RoleSelection onRoleSelect={setRole} selectedRole={role} />

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90"
          >
            Registrati
          </button>
        </form>
      </div>
    </div>
  );
}
