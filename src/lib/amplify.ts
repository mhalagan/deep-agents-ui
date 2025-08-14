import { Amplify } from 'aws-amplify';

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || 'your-user-pool-id',
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || 'your-user-pool-client-id',
      identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID || 'your-identity-pool-id',
      region: process.env.NEXT_PUBLIC_REGION || 'us-east-1',
    }
  }
};

// Configure Amplify
Amplify.configure(amplifyConfig);

export default amplifyConfig;