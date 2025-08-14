import AmplifyAuth from '@/components/AmplifyAuth';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Deep Agents UI
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access your AI agents
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <AmplifyAuth />
        </div>
      </div>
    </div>
  );
}