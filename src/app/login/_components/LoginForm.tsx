"use client";

import { signIn } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { AuthError } from "next-auth";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

// Define the validation schema
const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });
            let toastId = toast.loading("Logging you in...");

            if (response?.error) {
                // Handle the error case
                toast.error("Invalid email or password", {
                    id: toastId,
                });
                return { success: false, error: "Invalid email or password" };
            }
            // Only proceed if there's no error
            toast.success("Login successful!", {
                description: "Redirecting to ...",
                id: toastId,
            });
            router.replace("/save-details");
            return { success: true, message: "Login successful!" };
        } catch (error) {
            console.error(error);
            let errorMessage = "";
            if (error instanceof AuthError) {
                errorMessage = error.message;
            } else {
                errorMessage = (error as any).message;
            }
            toast.error(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const handleGoogleSignIn = async () => {
        await signIn("google", { callbackUrl: "/save-details" });
    };

    return (
        <div className="space-y-6">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="text-sm text-text-100"
                        >
                            Email*
                        </label>
                        <Input
                            id="email"
                            {...register("email")}
                            type="email"
                            placeholder="example@email.com"
                            className="w-full"
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="text-sm text-text-100"
                        >
                            Password*
                        </label>
                        <div className="relative">
                            <Input
                                id="password"
                                {...register("password")}
                                type={showPassword ? "text" : "password"}
                                placeholder="your password"
                                className="w-full pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (
                                    <Eye className="h-4 w-4" />
                                ) : (
                                    <EyeOff className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="text-right">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </div>

                <Button type="submit" className="w-full">
                    Log In
                </Button>
            </form>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                        Or Log In with
                    </span>
                </div>
            </div>

            {/* Google Sign In */}
            <Button
                onClick={handleGoogleSignIn}
                variant="outline"
                className="w-full"
            >
                <Image
                    src="/signup/google.png"
                    alt="Google Logo"
                    width={22}
                    height={22}
                    className="mr-2"
                />
                Google
            </Button>
        </div>
    );
}
