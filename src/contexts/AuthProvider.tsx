import React, { createContext, useContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

// Default context value (authentication disabled)
const defaultAuthContext: AuthContextType = {
  session: null,
  user: null,
  isLoading: false,
  signOut: async () => {}
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Mock AuthProvider that returns no session (authentication disabled)
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={defaultAuthContext}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}