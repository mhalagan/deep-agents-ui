# Deep Agents UI

Deep Agents are generic AI agents that are capable of handling tasks of varying complexity. This is a UI intended to be used alongside the [`deep-agents`](https://github.com/hwchase17/deepagents?ref=blog.langchain.com) package from LangChain.

If the term "Deep Agents" is new to you, check out these videos!
[What are Deep Agents?](https://www.youtube.com/watch?v=433SmtTc0TA)
[Implementing Deep Agents](https://www.youtube.com/watch?v=TTMYJAw5tiA&t=701s)

And check out this [video](https://youtu.be/0CE_BhdnZZI) for a walkthrough of this UI.

## 🚀 AWS Amplify Deployment

This application is configured for deployment on AWS Amplify, providing scalable hosting with built-in CI/CD, authentication, and serverless backend capabilities.

### Prerequisites

1. An AWS Account
2. AWS Amplify CLI (optional for local development)
3. Node.js 18.x or later

### Quick Deploy to AWS Amplify

#### Option 1: Deploy from GitHub (Recommended)

1. Fork or push this repository to your GitHub account
2. Go to the [AWS Amplify Console](https://console.aws.amazon.com/amplify)
3. Click "New app" → "Host web app"
4. Choose GitHub and authorize AWS Amplify
5. Select your repository and branch
6. Amplify will auto-detect the build settings from `amplify.yml`
7. Configure environment variables (see Environment Variables section below)
8. Click "Save and deploy"

#### Option 2: Manual Deploy

1. Build the application locally:
```bash
npm install
npm run build
```

2. Install the Amplify CLI:
```bash
npm install -g @aws-amplify/cli
```

3. Initialize and deploy:
```bash
amplify init
amplify push
amplify hosting add
amplify publish
```

### Environment Variables

Copy `.env.amplify.example` to `.env.local` and configure the following variables in your Amplify app:

#### Required Variables
- `NEXT_PUBLIC_DEPLOYMENT_URL` - Your LangGraph server URL
- `NEXT_PUBLIC_AGENT_ID` - Your agent ID from langgraph.json
- `NEXT_PUBLIC_LANGSMITH_API_KEY` - Your LangSmith API key

#### Optional AWS Cognito Variables (for AWS authentication)
- `NEXT_PUBLIC_USER_POOL_ID` - AWS Cognito User Pool ID
- `NEXT_PUBLIC_USER_POOL_CLIENT_ID` - AWS Cognito User Pool Client ID
- `NEXT_PUBLIC_IDENTITY_POOL_ID` - AWS Cognito Identity Pool ID
- `NEXT_PUBLIC_AWS_REGION` - AWS region (default: us-east-1)

To add environment variables in AWS Amplify:
1. Go to your app in the Amplify Console
2. Navigate to "App settings" → "Environment variables"
3. Add each variable with its corresponding value
4. Redeploy your app for changes to take effect

### AWS Cognito Authentication (Optional)

If you want to use AWS Cognito for authentication:

1. Create a Cognito User Pool in the AWS Console
2. Configure the app client settings
3. Add the Cognito environment variables to your Amplify app
4. The application will automatically detect and use Cognito when the variables are present

### Build Configuration

The `amplify.yml` file in the root directory contains the build configuration:
- Optimized caching for faster builds
- Standalone Next.js output for reduced deployment size
- Custom headers for optimal performance

### Features Enabled for AWS Amplify

- ✅ Server-Side Rendering (SSR) support
- ✅ API Routes compatibility
- ✅ Image optimization
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Environment-based configuration
- ✅ AWS Cognito authentication (optional)
- ✅ CloudWatch logging
- ✅ Auto-scaling

### Monitoring and Logs

Access logs and monitoring:
1. Go to your app in the Amplify Console
2. Navigate to "Monitoring" for metrics
3. Click "View in CloudWatch" for detailed logs

---

## Local Development

### Connecting to a Local LangGraph Server

Create a `.env.local` file and set two variables

```env
NEXT_PUBLIC_DEPLOYMENT_URL="http://127.0.0.1:2024" # Or your server URL
NEXT_PUBLIC_AGENT_ID=<your agent ID from langgraph.json>
```

### Connecting to a Production LangGraph Deployment on LGP

Create a `.env.local` file and set three variables

```env
NEXT_PUBLIC_DEPLOYMENT_URL="your agent server URL"
NEXT_PUBLIC_AGENT_ID=<your agent ID from langgraph.json>
NEXT_PUBLIC_LANGSMITH_API_KEY=<langsmith-api-key>
```

Once you have your environment variables set, install all dependencies and run your app.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to test out your deep agent!

## Troubleshooting AWS Amplify Deployment

### Common Issues

1. **Build Failures**: Check the build logs in the Amplify Console
2. **Environment Variables**: Ensure all required variables are set in Amplify
3. **Authentication Issues**: Verify Cognito configuration if using AWS auth
4. **API Connection**: Check CORS settings if connecting to external APIs

### Support

For AWS Amplify specific issues, refer to the [AWS Amplify Documentation](https://docs.amplify.aws/)
For Deep Agents issues, check the [LangChain Documentation](https://docs.langchain.com/)
