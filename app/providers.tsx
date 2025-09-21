'use client';

import { MiniKitProvider } from '@coinbase/minikit';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <MiniKitProvider
      chain="base"
      apiKey={process.env.NEXT_PUBLIC_MINIKIT_API_KEY || ''}
    >
      {children}
    </MiniKitProvider>
  );
}
