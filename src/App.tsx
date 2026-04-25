"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider, useApp } from "@/context/AppContext";
import Layout from "@/components/Layout";
import Login from "@/pages/Login";

const queryClient = new QueryClient();

function AppRoutes({ children }: { children: React.ReactNode }) {
  const { user } = useApp();

  if (!user) {
    return <Login />;
  }

  return (
    <Layout>
      {children}
    </Layout>
  );
}

function App({ children }: { children?: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <AppRoutes>{children}</AppRoutes>
          <Toaster />
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
