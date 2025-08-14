"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";
import "@/app/amplifyClient";

interface AuthSession {
  accessToken: string;
}

interface AuthContextType {
  session: AuthSession | null;
}

const AuthContext = createContext<AuthContextType>({ session: null });

function AuthProviderInner({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      try {
        const result = await fetchAuthSession();
        const token =
          result.tokens?.idToken?.toString?.() ||
          result.tokens?.accessToken?.toString?.();
        if (isMounted && token) {
          setSession({ accessToken: token });
          return;
        }
      } catch {}
      // Fallback to existing env-based token for local/dev without Amplify auth
      if (isMounted) {
        const fallback =
          process.env.NEXT_PUBLIC_LANGSMITH_API_KEY || "demo-token";
        setSession({ accessToken: fallback });
      }
    };
    init();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const enableAmplifyAuth =
    process.env.NEXT_PUBLIC_ENABLE_AMPLIFY_AUTH === "true";

  if (enableAmplifyAuth) {
    return (
      <Authenticator>
        {() => <AuthProviderInner>{children}</AuthProviderInner>}
      </Authenticator>
    );
  }

  return <AuthProviderInner>{children}</AuthProviderInner>;
}

export const useAuthContext = () => useContext(AuthContext);
