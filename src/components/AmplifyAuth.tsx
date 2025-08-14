'use client';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function AmplifyAuth() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username}!</h1>
          <p className="mb-4">You are now signed in to your Deep Agents UI application.</p>
          <button
            onClick={signOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>
      )}
    </Authenticator>
  );
}