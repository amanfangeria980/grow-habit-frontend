"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

const NavHeader = () => {
    const router = useRouter();
    const pathname = usePathname();
    const queryClient = useQueryClient();

    const getButtonClasses = (path: string) => {
        const isActive = pathname === path;
        return isActive
            ? "border-2 border-orange-400 text-orange-500 px-4 py-2 rounded-lg transition-colors duration-200"
            : "bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-200";
    };

    return (
        <div className="flex justify-between items-center p-4 bg-white">
            <button
                className={getButtonClasses("/user-home")}
                onClick={() => {
                    router.push("/user-home");
                }}
            >
                All Stats
            </button>
            <button
                className={getButtonClasses("/user-home/me")}
                onClick={() => {
                    router.push("/user-home/me");
                }}
            >
                My Stats
            </button>
            <button
                className={getButtonClasses("/reflection-form")}
                onClick={() => {
                    router.push("/reflection-form");
                }}
            >
                Form
            </button>
            <button
                className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                onClick={() => {
                    queryClient.clear();
                    localStorage.clear();
                    signOut();
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default NavHeader;
