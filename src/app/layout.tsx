import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { headers } from "next/headers";
import NavHeader from "@/components/navbar/NavHeader";
import TanstackProvider from "@/providers/tanstack-provider";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const headersList = await headers();
    const pathname = headersList.get("x-current-path");
    const publicRoutes = ["/login", "/signup", "/", "/save-details"];
    const isPublicRoute = publicRoutes.includes(pathname || "");

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preload" href="/signup/i1.png" as="image" />
                <link rel="preload" href="/signup/i2.png" as="image" />
                <link rel="preload" href="/signup/i3.png" as="image" />
                <link rel="preload" href="/logo.png" as="image" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <TanstackProvider>
                    {!isPublicRoute && <NavHeader />}
                    <SessionProvider>{children}</SessionProvider>
                    <Toaster />
                </TanstackProvider>
            </body>
        </html>
    );
}
