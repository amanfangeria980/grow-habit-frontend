// sonner.tsx
"use client";
import {
    AlertTriangle,
    CheckCircle,
    Info,
    Loader,
    XCircle,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    // const { theme = "system" } = useTheme();

    return (
        <Sonner
            // theme={theme as ToasterProps["theme"]}
            richColors
            toastOptions={{}}
            theme="light"
            position="top-center"
            // expand={true}
            // className="toaster group"
            // toastOptions={{
            //     classNames: {
            //         toast: "group toast group-[.toaster]:bg-background group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            //         description: "group-[.toast]:text-muted-foreground",
            //         actionButton:
            //             "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            //         cancelButton:
            //             "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            //         error: "bg-red-100 border border-red-400",
            //         success: "bg-green-100 border border-green-400",
            //         warning: "bg-yellow-100 border border-yellow-400",
            //         info: "bg-blue-100 border border-blue-400",
            //     },
            // }}
            icons={{
                success: <CheckCircle className="h-4 w-4 text-green-500" />,
                info: <Info className="h-4 w-4 text-blue-500" />,
                warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
                error: <XCircle className="h-4 w-4 text-red-500" />,
                loading: (
                    <Loader className="h-4 w-4 text-gray-500 animate-spin" />
                ),
            }}
            {...props}
        />
    );
};

export { Toaster };
