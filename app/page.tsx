import { AppShell } from '../components/AppShell';
import { NavigationTabs } from '../components/NavigationTabs';
import { TipGeneratorForm } from '../components/TipGeneratorForm';

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-xl">
        {/* Header */}
        <div className="text-center space-y-md">
          <div className="text-6xl mb-md">🐄</div>
          <h1 className="text-3xl font-bold text-textPrimary">
            Social Boost AI
          </h1>
          <p className="text-base text-textSecondary">
            Get more likes with AI-powered social media tips
          </p>
        </div>

        {/* Navigation */}
        <NavigationTabs />

        {/* Main Content */}
        <TipGeneratorForm />
      </div>
    </AppShell>
  );
}
