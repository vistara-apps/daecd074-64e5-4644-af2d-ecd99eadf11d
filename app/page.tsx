import { AppShell } from '../components/AppShell';
import { NavigationTabs } from '../components/NavigationTabs';
import { TipGeneratorForm } from '../components/TipGeneratorForm';
import { ErrorBoundary } from '../components/ErrorBoundary';

export default function HomePage() {
  return (
    <ErrorBoundary>
      <AppShell>
        <div className="space-y-xl">
          {/* Header */}
          <div className="text-center space-y-md">
            <div className="text-6xl mb-md">🚀</div>
            <h1 className="text-3xl font-bold text-textPrimary">
              Social Boost AI
            </h1>
            <p className="text-base text-textSecondary">
              Get more likes with AI-powered social media tips
            </p>
            <div className="text-xs text-textSecondary mt-sm">
              Powered by AI • Free & Premium plans available
            </div>
          </div>

          {/* Main Content */}
          <ErrorBoundary fallback={
            <div className="card text-center py-xl">
              <div className="text-red-500 mb-md">⚠️</div>
              <h3 className="text-lg font-semibold text-textPrimary mb-sm">
                Content Loading Error
              </h3>
              <p className="text-sm text-textSecondary">
                Unable to load the main content. Please refresh the page.
              </p>
            </div>
          }>
            <TipGeneratorForm />
          </ErrorBoundary>
        </div>
      </AppShell>
    </ErrorBoundary>
  );
}
