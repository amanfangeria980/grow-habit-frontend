"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupCarousel } from "./_components/SignupCarousel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Define the validation schema
const registerSchema = z.object({
    fullname: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
    agreeToTerms: z.boolean().refine((val) => val === true, {
        message: "You must agree to the terms and conditions",
    }),
});

// Infer the type from the schema
type RegisterFormData = z.infer<typeof registerSchema>;

export default function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            agreeToTerms: false,
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            console.log("Form submitted:", data);
            // Add your registration logic here
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    const handleGoogleSignIn = async () => {
        await signIn("google", { callbackUrl: "/user-home" });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-4 px-2 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-4 rounded-lg border border-gray-300">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={48}
                        height={48}
                        className="object-contain rounded-full border border-gray-300"
                    />
                    <h1 className="text-xl font-bold text-text-100">
                        Grow Habit
                    </h1>
                </div>

                {/* Illustration */}
                <div className="border border-gray-300 rounded-lg p-2">
                    <SignupCarousel />
                </div>

                {/* Title */}
                <div>
                    <h2 className="text-xl text-text-100">
                        Create an Account😁
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Kindly fill in your details to create an account
                    </p>
                </div>

                {/* Form */}
                <form
                    className="mt-8 space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="fullname"
                                className="text-sm text-text-100"
                            >
                                Your Full Name
                                <span className="text-xs text-slate-400">
                                    *
                                </span>
                            </label>
                            <Input
                                id="fullname"
                                {...register("fullname")}
                                type="text"
                                placeholder="Enter your name"
                                className="w-full"
                            />
                            {errors.fullname && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.fullname.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="text-sm text-text-100"
                            >
                                Email
                                <span className="text-xs text-slate-400">
                                    *
                                </span>
                            </label>
                            <Input
                                id="email"
                                {...register("email")}
                                type="email"
                                placeholder="Example@email.com"
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
                            <Input
                                id="password"
                                {...register("password")}
                                type="password"
                                placeholder="At least 8 characters"
                                className="w-full"
                            />
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="terms"
                                {...register("agreeToTerms")}
                                className="h-4 w-4"
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm text-text-100"
                            >
                                I agree to terms & conditions
                                <span className="text-xs text-slate-400">
                                    *
                                </span>
                            </label>
                        </div>
                        {errors.agreeToTerms && (
                            <p className="text-xs text-red-600">
                                {errors.agreeToTerms.message}
                            </p>
                        )}
                    </div>

                    <Button type="submit" className="w-full">
                        Register Account
                    </Button>
                </form>

                {/* Divider */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Or Sign Up with
                            </span>
                        </div>
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

                {/* Login Link */}
                <div className="text-center text-sm">
                    <span className="text-slate-400">
                        Already have an account?{" "}
                    </span>
                    <Link
                        href="/login"
                        className="font-medium text-text-100 hover:text-text-100"
                    >
                        Log In
                    </Link>
                </div>

                {/* Footer */}
                <div className="text-center text-xs text-gray-500">
                    © 2024 ALL RIGHTS RESERVED - Grow Habit
                </div>
            </div>
        </div>
    );
}
