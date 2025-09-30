# Deep Agents UI

Deep Agents are generic AI agents that are capable of handling tasks of varying complexity. This is a UI intended to be used alongside the [`deep-agents`](https://github.com/hwchase17/deepagents?ref=blog.langchain.com) package from LangChain.

If the term "Deep Agents" is new to you, check out these videos!
[What are Deep Agents?](https://www.youtube.com/watch?v=433SmtTc0TA)
[Implementing Deep Agents](https://www.youtube.com/watch?v=TTMYJAw5tiA&t=701s)

And check out this [video](https://youtu.be/0CE_BhdnZZI) for a walkthrough of this UI.

## Deployment with AWS Amplify

This application is configured to be deployed using AWS Amplify. You can deploy it in two ways:

### Option 1: Deploy via AWS Amplify Console (Recommended)

1. **Connect your repository to AWS Amplify:**
   - Go to the [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New app" > "Host web app"
   - Connect your Git repository (GitHub, GitLab, etc.)
   - Select the branch you want to deploy

2. **Configure build settings:**
   - Amplify will automatically detect the `amplify.yml` file for build configuration
   - The configuration is already optimized for Next.js with static export

3. **Set environment variables:**
   - In the Amplify Console, go to App settings > Environment variables
   - Add the following variables:
     ```
     NEXT_PUBLIC_DEPLOYMENT_URL=your_langgraph_server_url
     NEXT_PUBLIC_AGENT_ID=your_agent_id_from_langgraph_json
     NEXT_PUBLIC_LANGSMITH_API_KEY=your_langsmith_api_key
     ```

4. **Deploy:**
   - Click "Save and deploy"
   - Amplify will automatically build and deploy your application

### Option 2: Deploy via Amplify CLI

1. **Install the Amplify CLI:**
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. **Configure Amplify:**
   ```bash
   amplify configure
   ```

3. **Initialize your project:**
   ```bash
   amplify init
   ```

4. **Add hosting:**
   ```bash
   amplify add hosting
   ```
   Select "Amazon CloudFront and S3" for hosting

5. **Deploy:**
   ```bash
   npm run build
   amplify publish
   ```

## Local Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- AWS CLI configured (for Amplify CLI deployment)

### Setup

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment configuration:**
   Copy `.env.example` to `.env.local` and configure your variables:

   ```env
   # LangChain/LangGraph Configuration
   NEXT_PUBLIC_DEPLOYMENT_URL="http://127.0.0.1:2024"
   NEXT_PUBLIC_AGENT_ID=your_agent_id_from_langgraph_json
   NEXT_PUBLIC_LANGSMITH_API_KEY=your_langsmith_api_key
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to test your deep agent!

## Configuration Details

### Connecting to a Local LangGraph Server

Create a `.env.local` file and set two variables:

```env
NEXT_PUBLIC_DEPLOYMENT_URL="http://127.0.0.1:2024" # Or your server URL
NEXT_PUBLIC_AGENT_ID=<your agent ID from langgraph.json>
```

### Connecting to a Production LangGraph Deployment on LGP

Create a `.env.local` file and set three variables:

```env
NEXT_PUBLIC_DEPLOYMENT_URL="your agent server URL"
NEXT_PUBLIC_AGENT_ID=<your agent ID from langgraph.json>
NEXT_PUBLIC_LANGSMITH_API_KEY=<langsmith-api-key>
```

## Architecture

This application uses:
- **Next.js 15** with App Router for the frontend framework
- **AWS Amplify** for hosting and CI/CD
- **Tailwind CSS** for styling
- **Radix UI** for accessible component primitives
- **LangChain SDK** for agent communication

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run dev`
5. Submit a pull request

## Support

For issues related to:
- **Deep Agents**: Check the [deep-agents repository](https://github.com/hwchase17/deepagents)
- **AWS Amplify**: Check the [AWS Amplify documentation](https://docs.amplify.aws/)
- **This UI**: Open an issue in this repository
