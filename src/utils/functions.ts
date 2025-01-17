import { signIn } from "next-auth/react";
import { RegisterFormData, SignInFormData } from "./types";

export const registerUser = async (data: RegisterFormData) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    const responseData = await response.json();
    return responseData;
};
