import Image from "next/image";
import Link from "next/link";
import { SignupCarousel } from "../signup/_components/SignupCarousel";
import { LoginForm } from "./_components/LoginForm";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await getSession();
    if (session) {
        redirect("/");
    }

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

                {/* Carousel */}
                <div className="border border-gray-300 rounded-lg p-2">
                    <SignupCarousel />
                </div>

                {/* Title */}
                <div>
                    <h2 className="text-xl text-text-100">Welcome Back 👋</h2>
                    <p className="mt-2 text-sm text-slate-400">
                        We are happy to have you back
                    </p>
                </div>

                {/* Login Form Component */}
                <LoginForm />

                {/* Sign Up Link */}
                <div className="text-center text-sm">
                    <span className="text-slate-400">
                        Don't you have an account?{" "}
                    </span>
                    <Link
                        href="/signup"
                        className="font-medium text-text-100 hover:text-text-100"
                    >
                        Sign up
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
