# Deep Agents UI

Deep Agents are generic AI agents that are capable of handling tasks of varying complexity. This is a UI intended to be used alongside the [`deep-agents`](https://github.com/hwchase17/deepagents?ref=blog.langchain.com) package from LangChain.

If the term "Deep Agents" is new to you, check out these videos!
[What are Deep Agents?](https://www.youtube.com/watch?v=433SmtTc0TA)
[Implementing Deep Agents](https://www.youtube.com/watch?v=TTMYJAw5tiA&t=701s)

And check out this [video](https://youtu.be/0CE_BhdnZZI) for a walkthrough of this UI.

## 🚀 AWS Amplify Integration

This project has been enhanced with **AWS Amplify** for:
- 🔐 **Authentication**: User sign-up, sign-in, and session management
- ☁️ **Cloud Backend**: Scalable AWS infrastructure
- 🚀 **Easy Deployment**: One-click deployment to AWS

### Quick Start with Amplify

1. **Setup AWS Amplify**:
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   npm run amplify:init
   npm run amplify:push
   ```

2. **Configure Environment**:
   ```bash
   cp .env.local.example .env.local
   # Update with your AWS resource values
   ```

3. **Run the App**:
   ```bash
   npm install
   npm run dev
   ```

📖 **For detailed setup instructions, see [AMPLIFY_SETUP.md](./AMPLIFY_SETUP.md)**

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

## 🌟 Features

- **AI-Powered Deep Agents**: Integrate with LangChain deep-agents
- **AWS Amplify Authentication**: Secure user management
- **Modern UI**: Built with Next.js 15 and Tailwind CSS
- **TypeScript**: Full type safety
- **Responsive Design**: Works on all devices
- **Cloud Ready**: Deploy to AWS with ease
