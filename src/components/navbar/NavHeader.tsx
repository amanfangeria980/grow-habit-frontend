"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

const NavHeader = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return (
        <div className="flex justify-between items-center p-4">
            <button
                className="bg-blue-500 rounded-md text-white p-1"
                onClick={() => {
                    router.push("/user-home");
                }}
            >
                All Stats
            </button>
            <button
                className="bg-green-500 rounded-md text-white p-1"
                onClick={() => {
                    router.push("/user-home/me");
                }}
            >
                My Stats
            </button>
            <button
                className="bg-yellow-500 rounded-md text-white p-1"
                onClick={() => {
                    router.push("/reflection-form");
                }}
            >
                Form
            </button>
            <button
                className="bg-red-500 rounded-md text-white p-1"
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
