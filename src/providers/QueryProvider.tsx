"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const client = new QueryClient();

interface IProps {
  children: React.ReactNode;
}

const QueryProvider: React.FC<IProps> = ({ children }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default QueryProvider;
