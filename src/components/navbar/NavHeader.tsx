"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { BarChart3, User2, ClipboardList, LogOut } from "lucide-react";

const NavHeader = () => {
    const router = useRouter();
    const pathname = usePathname();
    const queryClient = useQueryClient();

    const getButtonClasses = (path: string) => {
        const isActive = pathname === path;
        return isActive
            ? "border-2 border-orange-400 text-orange-500 px-2 sm:px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-1 sm:gap-2 text-xs sm:text-base whitespace-nowrap"
            : "bg-orange-500 hover:bg-orange-600 text-white px-2 sm:px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-1 sm:gap-2 text-xs sm:text-base whitespace-nowrap";
    };

    return (
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center p-2 sm:p-4 bg-white gap-2">
            <button
                className={getButtonClasses("/user-home")}
                onClick={() => {
                    router.push("/user-home");
                }}
            >
                <BarChart3 size={16} className="sm:w-[18px]" />
                All Stats
            </button>
            <button
                className={getButtonClasses("/user-home/me")}
                onClick={() => {
                    router.push("/user-home/me");
                }}
            >
                <User2 size={16} className="sm:w-[18px]" />
                My Stats
            </button>
            <button
                className={getButtonClasses("/reflection-form")}
                onClick={() => {
                    router.push("/reflection-form");
                }}
            >
                <ClipboardList size={16} className="sm:w-[18px]" />
                Form
            </button>
            <button
                className="bg-slate-800 hover:bg-slate-900 text-white px-2 sm:px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-1 sm:gap-2 text-xs sm:text-base whitespace-nowrap"
                onClick={() => {
                    queryClient.clear();
                    localStorage.clear();
                    signOut();
                }}
            >
                <LogOut size={16} className="sm:w-[18px]" />
                Logout
            </button>
        </div>
    );
};

export default NavHeader;
