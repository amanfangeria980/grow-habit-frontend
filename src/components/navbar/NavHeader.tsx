"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

const NavHeader = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return (
        <div className="flex justify-between items-center p-4 bg-white">
            <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                onClick={() => {
                    router.push("/user-home");
                }}
            >
                All Stats
            </button>
            <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                onClick={() => {
                    router.push("/user-home/me");
                }}
            >
                My Stats
            </button>
            <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
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
