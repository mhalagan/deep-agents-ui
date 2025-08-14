'use client';

import React, { useState } from 'react';
import { signIn, signUp, confirmSignUp, signOut, resetPassword, confirmResetPassword } from 'aws-amplify/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

type AuthMode = 'signIn' | 'signUp' | 'confirmSignUp' | 'forgotPassword' | 'resetPassword';

interface AmplifyAuthFormProps {
  onSuccess?: () => void;
}

export function AmplifyAuthForm({ onSuccess }: AmplifyAuthFormProps) {
  const [mode, setMode] = useState<AuthMode>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { isSignedIn } = await signIn({ username: email, password });
      if (isSignedIn) {
        toast.success('Successfully signed in!');
        onSuccess?.();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { isSignUpComplete, nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });
      
      if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        setMode('confirmSignUp');
        toast.success('Please check your email for the confirmation code');
      } else if (isSignUpComplete) {
        toast.success('Sign up successful! Please sign in.');
        setMode('signIn');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: email,
        confirmationCode,
      });
      if (isSignUpComplete) {
        toast.success('Email confirmed! Please sign in.');
        setMode('signIn');
        setConfirmationCode('');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to confirm sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { nextStep } = await resetPassword({ username: email });
      if (nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE') {
        setMode('resetPassword');
        toast.success('Password reset code sent to your email');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await confirmResetPassword({
        username: email,
        confirmationCode,
        newPassword,
      });
      toast.success('Password reset successful! Please sign in.');
      setMode('signIn');
      setConfirmationCode('');
      setNewPassword('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    switch (mode) {
      case 'signIn':
        return (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={() => setMode('signUp')}
                className="text-sm text-blue-600 hover:underline"
              >
                Don't have an account? Sign up
              </button>
              <br />
              <button
                type="button"
                onClick={() => setMode('forgotPassword')}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </form>
        );

      case 'signUp':
        return (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </Button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode('signIn')}
                className="text-sm text-blue-600 hover:underline"
              >
                Already have an account? Sign in
              </button>
            </div>
          </form>
        );

      case 'confirmSignUp':
        return (
          <form onSubmit={handleConfirmSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Confirmation Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter confirmation code"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Confirming...' : 'Confirm'}
            </Button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode('signIn')}
                className="text-sm text-blue-600 hover:underline"
              >
                Back to sign in
              </button>
            </div>
          </form>
        );

      case 'forgotPassword':
        return (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Code'}
            </Button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode('signIn')}
                className="text-sm text-blue-600 hover:underline"
              >
                Back to sign in
              </button>
            </div>
          </form>
        );

      case 'resetPassword':
        return (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Reset Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter reset code"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </Button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode('signIn')}
                className="text-sm text-blue-600 hover:underline"
              >
                Back to sign in
              </button>
            </div>
          </form>
        );
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'signIn':
        return 'Sign In';
      case 'signUp':
        return 'Create Account';
      case 'confirmSignUp':
        return 'Confirm Your Email';
      case 'forgotPassword':
        return 'Reset Password';
      case 'resetPassword':
        return 'Set New Password';
    }
  };

  const getDescription = () => {
    switch (mode) {
      case 'signIn':
        return 'Enter your credentials to access your account';
      case 'signUp':
        return 'Create a new account to get started';
      case 'confirmSignUp':
        return 'We sent a confirmation code to your email';
      case 'forgotPassword':
        return 'Enter your email to receive a password reset code';
      case 'resetPassword':
        return 'Enter the code from your email and set a new password';
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
        <CardDescription>{getDescription()}</CardDescription>
      </CardHeader>
      <CardContent>{renderForm()}</CardContent>
    </Card>
  );
}