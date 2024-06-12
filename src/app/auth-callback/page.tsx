"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAuthStatus } from "./actions";
import { useRouter } from "next/navigation";
import { SymbolIcon } from "@radix-ui/react-icons";

// After authentication user would be redirected here
const Page = () => {
  // ---------------------------------------------------------------------------
  const [configId, setConfigId] = useState<string | null>(null);
  // ---------------------------------------------------------------------------
  const router = useRouter();
  // ---------------------------------------------------------------------------
  // On first render, get configuration id from local storage
  useEffect(() => {
    const configurationId = localStorage.getItem("configurationId");
    if (configurationId) setConfigId(configurationId);
  }, []);
  // ---------------------------------------------------------------------------
  // Use server action to create/find the user in our own Database
  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });
  // ---------------------------------------------------------------------------
  // If user was created/found successfully in our db
  if (data?.success) {
    // If config id existed in local storage, redirect to preview page for the user to finish payment
    if (configId) {
      localStorage.removeItem("configurationId");
      router.push(`/configure/preview?id=${configId}`);
    } else {
      // Not pending config, go home
      router.push("/");
    }
  }
  // ---------------------------------------------------------------------------
  return (
    <div className="mt-24 flex w-full justify-center">
      <div className="flex flex-col items-center gap-2">
        <SymbolIcon className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="text-xl font-semibold">Logging you in...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;
