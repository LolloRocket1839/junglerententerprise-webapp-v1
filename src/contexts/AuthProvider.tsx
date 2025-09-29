import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('[AuthProvider] Initializing auth...');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[AuthProvider] Auth state changed:', event, session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession()
      .then(({ data: { session }, error }) => {
        if (error) {
          console.error('[AuthProvider] Error getting session:', error);
        } else {
          console.log('[AuthProvider] Existing session found:', session?.user?.email || 'none');
        }
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('[AuthProvider] Failed to get session:', err);
        setIsLoading(false);
      });

    return () => {
      console.log('[AuthProvider] Cleaning up subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      console.log('[AuthProvider] Signing out...');
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      console.log('[AuthProvider] Sign out successful');
    } catch (error) {
      console.error('[AuthProvider] Error signing out:', error);
      throw error;
    }
  };

  const value = {
    session,
    user,
    isLoading,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}