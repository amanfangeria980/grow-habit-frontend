"use client";
import { useQueryClient } from "@tanstack/react-query";

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export const useUserFromTanstack = () => {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<User>(["user"]);
    return user;
};
