import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

// ─── Tipos ────────────────────────────────────────────────────────
type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// ─── Contexto ─────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// ─── Provider ─────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user,      setUser]      = useState<User | null>(null);
  const [token,     setToken]     = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        const savedToken = await AsyncStorage.getItem('@divmorada:token');
        const savedUser  = await AsyncStorage.getItem('@divmorada:user');
        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error('Erro ao carregar sessão:', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadSession();
  }, []);

  async function login(email: string, password: string) {
    const response = await fetch('https://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Email ou senha inválidos.');
    }

    const data = await response.json();
    const { token: jwt, user: userData } = data;

    await AsyncStorage.setItem('@divmorada:token', jwt);
    await AsyncStorage.setItem('@divmorada:user', JSON.stringify(userData));

    setToken(jwt);
    setUser(userData);
  }

  async function logout() {
    await AsyncStorage.multiRemove(['@divmorada:token', '@divmorada:user']);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
