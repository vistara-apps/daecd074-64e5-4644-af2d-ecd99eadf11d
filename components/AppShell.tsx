import { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-md mx-auto px-lg py-xl">
        {children}
      </div>
    </div>
  );
}
