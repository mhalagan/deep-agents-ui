# AWS Amplify Setup Guide

This repository has been converted to use AWS Amplify for authentication and backend services.

## Prerequisites

1. **AWS Account**: You need an AWS account with appropriate permissions
2. **AWS CLI**: Install and configure AWS CLI
3. **Node.js**: Version 18 or higher
4. **npm**: Package manager

## Initial Setup

### 1. Install AWS Amplify CLI

```bash
npm install -g @aws-amplify/cli
```

### 2. Configure AWS Amplify

```bash
amplify configure
```

Follow the prompts to:
- Sign in to your AWS account
- Create a new IAM user (recommended)
- Configure the user with appropriate permissions
- Set your default region

### 3. Initialize Amplify in your project

```bash
npm run amplify:init
```

This will:
- Create the `amplify/` directory
- Set up your project configuration
- Configure your default editor
- Choose your app type (JavaScript/React)

### 4. Add Authentication

```bash
amplify add auth
```

Choose the following options:
- Default configuration
- Username sign-in
- No, I am done

### 5. Push the changes to AWS

```bash
npm run amplify:push
```

This will create the necessary AWS resources (Cognito User Pool, Identity Pool, etc.)

### 6. Get your configuration values

After the push completes, Amplify will output your configuration values. Copy these to your `.env.local` file:

```bash
cp .env.local.example .env.local
```

Then update the values with your actual AWS resources.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# AWS Amplify Configuration
NEXT_PUBLIC_USER_POOL_ID=your-user-pool-id
NEXT_PUBLIC_USER_POOL_CLIENT_ID=your-user-pool-client-id
NEXT_PUBLIC_IDENTITY_POOL_ID=your-identity-pool-id
NEXT_PUBLIC_REGION=us-east-1

# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
```

## Available Scripts

- `npm run amplify:init` - Initialize Amplify in your project
- `npm run amplify:push` - Push local changes to AWS
- `npm run amplify:pull` - Pull remote changes from AWS
- `npm run amplify:status` - Check the status of your Amplify resources
- `npm run amplify:env` - Manage environments
- `npm run amplify:configure` - Configure Amplify CLI

## Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. The app will now use AWS Amplify for authentication
3. Users can sign up and sign in using the built-in Amplify UI components

## Deployment

### Using AWS Amplify Console

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Go to the AWS Amplify Console
3. Click "New app" → "Host web app"
4. Connect your repository
5. Configure build settings (use the `amplify.yml` file)
6. Deploy

### Manual Deployment

1. Build your app:
   ```bash
   npm run build
   ```

2. Deploy the `.next` folder to your hosting provider

## Troubleshooting

### Common Issues

1. **Configuration errors**: Make sure your `.env.local` file has the correct values
2. **Authentication not working**: Verify that your Cognito User Pool is properly configured
3. **Build failures**: Check that all Amplify resources are properly deployed

### Getting Help

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [Amplify UI React Documentation](https://ui.docs.amplify.aws/)
- [AWS Support](https://aws.amazon.com/support/)

## Security Notes

- Never commit your `.env.local` file to version control
- Use IAM roles with minimal required permissions
- Regularly rotate your AWS access keys
- Enable MFA on your AWS account