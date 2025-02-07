// app/providers.jsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

export default function TanstackProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        gcTime: 1000 * 60 * 60 * 30, // 30 days
                        staleTime: 1000 * 60 * 5, // 5 minutes
                        refetchOnMount: false,
                    },
                },
            })
    );

    useEffect(() => {
        if (typeof window !== "undefined") {
            const localStoragePersister = createSyncStoragePersister({
                storage: window.localStorage,
            });

            persistQueryClient({
                queryClient,
                persister: localStoragePersister,
                maxAge: 1000 * 60 * 60 * 30, // 30 days
            });
        }
    }, [queryClient]);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
