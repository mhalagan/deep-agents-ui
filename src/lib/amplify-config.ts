import { Amplify } from 'aws-amplify';

// AWS Amplify configuration
// These values will be populated from environment variables
const amplifyConfig = {
  Auth: {
    Cognito: {
      // AWS Cognito User Pool configuration
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || '',
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || '',
      identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,
      loginWith: {
        email: true,
        username: false,
      },
      signUpVerificationMethod: 'code' as const,
      userAttributes: {
        email: {
          required: true,
        },
      },
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
  API: {
    REST: {
      DeepAgentsAPI: {
        endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || process.env.NEXT_PUBLIC_DEPLOYMENT_URL || '',
        region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
      },
    },
  },
};

// Configure Amplify only if required environment variables are present
export function configureAmplify() {
  if (process.env.NEXT_PUBLIC_USER_POOL_ID && process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID) {
    Amplify.configure(amplifyConfig);
    return true;
  }
  return false;
}

export default amplifyConfig;