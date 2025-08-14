"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { fetchAuthSession } from "aws-amplify/auth";

interface AuthSession {
  accessToken: string;
}

interface AuthContextType {
  session: AuthSession | null;
}

const AuthContext = createContext<AuthContextType>({ session: null });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeSession = async () => {
      // Try to get an access token from Amplify (Cognito) if configured
      try {
        const { tokens } = await fetchAuthSession();
        const cognitoAccessToken = tokens?.accessToken?.toString();
        if (cognitoAccessToken && isMounted) {
          setSession({ accessToken: cognitoAccessToken });
          return;
        }
      } catch {
        // Swallow errors to allow env-token fallback
      }

      // Fallback to env-based token
      if (isMounted) {
        setSession({
          accessToken: process.env.NEXT_PUBLIC_LANGSMITH_API_KEY || "demo-token",
        });
      }
    };

    void initializeSession();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
