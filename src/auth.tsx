import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { User } from './types';
import { clearSession, getCurrentUser, loginUser, registerUser } from './store';

interface AuthCtx {
  user: User | null;
  signIn: (mobile: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signUp: (mobile: string, password: string, name: string) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getCurrentUser());

 const signIn = useCallback(async (mobile: string, password: string) => {
  const res = await loginUser(mobile, password);

  if (res.ok && res.user) {
    setUser(res.user);
  }

  return {
    ok: res.ok,
    error: res.error,
  };
}, []);
 const signUp = useCallback(async (email: string, password: string, name: string) => {
  const res = await registerUser(email, password, name);

  if (res.ok && res.user) {
    setUser(res.user);
  }

  return {
    ok: res.ok,
    error: res.error,
  };
}, []);

  const signOut = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  useEffect(() => {
    if (!user) setUser(getCurrentUser());
  }, [user]);

  const value = useMemo(() => ({ user, signIn, signUp, signOut }), [user, signIn, signUp, signOut]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
