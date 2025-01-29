// app/providers.jsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
                        refetchOnMount: true,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
