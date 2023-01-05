"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { SSRProvider, Provider, defaultTheme } from "@adobe/react-spectrum";

// Create a client
// const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(new QueryClient());

  return (
    <SSRProvider>
      <Provider theme={defaultTheme} locale={"en-US"}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    </SSRProvider>
  );
}
