"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import { configureAmplify } from '@/lib/amplify-config';

interface AuthSession {
  accessToken: string;
}

interface AuthContextType {
  session: AuthSession | null;
  isAmplifyEnabled: boolean;
}

const AuthContext = createContext<AuthContextType>({ session: null, isAmplifyEnabled: false });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isAmplifyEnabled, setIsAmplifyEnabled] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      // Try to configure Amplify
      const amplifyConfigured = configureAmplify();
      setIsAmplifyEnabled(amplifyConfigured);

      if (amplifyConfigured) {
        // Use AWS Amplify authentication
        try {
          const authSession = await fetchAuthSession();
          const accessToken = authSession.tokens?.accessToken?.toString();
          
          if (accessToken) {
            setSession({ accessToken });
          } else {
            // Fall back to environment variable if no Amplify session
            setSession({
              accessToken: process.env.NEXT_PUBLIC_LANGSMITH_API_KEY || "demo-token",
            });
          }
        } catch (error) {
          console.log('No active Amplify session, using fallback authentication');
          setSession({
            accessToken: process.env.NEXT_PUBLIC_LANGSMITH_API_KEY || "demo-token",
          });
        }
      } else {
        // Use existing authentication method
        setSession({
          accessToken: process.env.NEXT_PUBLIC_LANGSMITH_API_KEY || "demo-token",
        });
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ session, isAmplifyEnabled }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
