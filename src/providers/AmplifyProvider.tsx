'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession, getCurrentUser, signIn, signOut, signUp, confirmSignUp } from 'aws-amplify/auth';
import { configureAmplify } from '@/lib/amplify-config';

interface AmplifyUser {
  username: string;
  userId: string;
  signInDetails?: any;
}

interface AmplifyAuthContextType {
  user: AmplifyUser | null;
  isLoading: boolean;
  isAmplifyEnabled: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  confirmSignUp: (email: string, code: string) => Promise<void>;
  signOut: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
}

const AmplifyAuthContext = createContext<AmplifyAuthContextType | undefined>(undefined);

export function AmplifyProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AmplifyUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAmplifyEnabled, setIsAmplifyEnabled] = useState(false);

  useEffect(() => {
    // Configure Amplify on client side
    const amplifyConfigured = configureAmplify();
    setIsAmplifyEnabled(amplifyConfigured);

    if (amplifyConfigured) {
      // Check for existing user session
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (username: string, password: string) => {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      if (isSignedIn) {
        await checkUser();
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });
      return;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const handleConfirmSignUp = async (email: string, code: string) => {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      if (isSignUpComplete) {
        // User can now sign in
        return;
      }
    } catch (error) {
      console.error('Confirm sign up error:', error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const getAccessToken = async (): Promise<string | null> => {
    if (!isAmplifyEnabled) {
      return null;
    }
    try {
      const session = await fetchAuthSession();
      return session.tokens?.accessToken?.toString() || null;
    } catch (error) {
      console.error('Failed to get access token:', error);
      return null;
    }
  };

  const value: AmplifyAuthContextType = {
    user,
    isLoading,
    isAmplifyEnabled,
    signIn: handleSignIn,
    signUp: handleSignUp,
    confirmSignUp: handleConfirmSignUp,
    signOut: handleSignOut,
    getAccessToken,
  };

  return (
    <AmplifyAuthContext.Provider value={value}>
      {children}
    </AmplifyAuthContext.Provider>
  );
}

export const useAmplifyAuth = () => {
  const context = useContext(AmplifyAuthContext);
  if (context === undefined) {
    throw new Error('useAmplifyAuth must be used within an AmplifyProvider');
  }
  return context;
};