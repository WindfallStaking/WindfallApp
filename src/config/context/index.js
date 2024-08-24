'use client';
import * as React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '@/config/query';
import { config } from '@/config/wagmi';

export const queryClient = getQueryClient();

export function Providers({ children }) {

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({ accentColor: '#30bfdfa8' })}>{children}</RainbowKitProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
