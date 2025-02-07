"use client";
import PhoneNumberInput from "@/components/phoneNumberInput/PhoneNumberInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import LoadingComponent from "@/components/loader/LoadingComponent";
import { useQuery } from "@tanstack/react-query";

const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    );

const phoneNumberSchema = z.object({
    countryCode: z.string().min(1, "Country code is required"),
    phoneNumber: z
        .string()
        .min(10, "Phone number must be at least 10 characters")
        .regex(
            /^\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/,
            "Please enter a valid phone number"
        ),
});

const SaveDetailsPage = ({ email }: { email: string }) => {
    const router = useRouter();
    const [hasPhoneNumber, setHasPhoneNumber] = useState(false);
    const [hasPassword, setHasPassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [showPasswordSection, setShowPasswordSection] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const session = await fetch("/api/auth/session");
            const data = await session.json();
            if (!data.user) return null;
            return data.user;
        },
        staleTime: Infinity,
    });

    const fetchPassword = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check-has-password`,
                {
                    method: "POST",
                    body: JSON.stringify({ email: email }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            setHasPassword(data.hasPassword);
            return data.hasPassword;
        } catch (error) {
            console.error("Error fetching password:", error);
            toast.error("Error checking password status");
            return false;
        }
    };

    const fetchPhoneNumber = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/get-phone-number`,
                {
                    method: "POST",
                    body: JSON.stringify({ email: email }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            const hasPhone = data.phoneNumber !== null;
            setHasPhoneNumber(hasPhone);
            return hasPhone;
        } catch (error) {
            console.error("Error fetching phone number:", error);
            toast.error("Error checking phone number status");
            return false;
        }
    };

    const savePhoneNumber = async () => {
        try {
            // Validate phone number before sending
            const validationResult = phoneNumberSchema.safeParse({
                phoneNumber,
                countryCode,
            });

            if (!validationResult.success) {
                setPhoneNumberError(validationResult.error.errors[0].message);
                return;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/update-phone-number`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        phoneNumber: phoneNumber,
                        countryCode: countryCode,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok) {
                toast.success("Phone number saved successfully");
                setHasPhoneNumber(true);
                if (hasPassword) {
                    router.replace("/user-home/me");
                    router.refresh();
                } else {
                    setShowPasswordSection(true);
                }
            } else {
                toast.error("Error saving phone number");
            }
        } catch (error) {
            console.error("Error saving phone number:", error);
            toast.error("Error saving phone number");
        }
    };

    const savePassword = async () => {
        try {
            // Validate password before sending
            const validationResult = passwordSchema.safeParse(password);
            if (!validationResult.success) {
                setPasswordError(validationResult.error.errors[0].message);
                return;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/update-password`,
                {
                    method: "POST",
                    body: JSON.stringify({ email: email, password: password }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok) {
                toast.success("Password saved successfully");
                router.replace("/user-home/me");
                router.refresh();
            } else {
                toast.error("Error saving password");
            }
        } catch (error) {
            console.error("Error saving password:", error);
            toast.error("Error saving password");
        }
    };

    const handlePasswordKeyPress = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter" && password) {
            e.preventDefault();
            savePassword();
        }
    };

    useEffect(() => {
        const initializeData = async () => {
            try {
                const [hasPhone, hasPass] = await Promise.all([
                    fetchPhoneNumber(),
                    fetchPassword(),
                ]);

                if (hasPhone && hasPass) {
                    router.replace("/user-home/me");
                    router.refresh();
                    return;
                } else if (hasPhone) {
                    setShowPasswordSection(true);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error initializing data:", error);
                setLoading(false);
                toast.error("Error loading user data");
            }
        };

        initializeData();
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen m-1 p-2 gap-4">
            {!showPasswordSection ? (
                <>
                    <h1 className="text-2xl font-bold">
                        Please enter your phone number
                    </h1>
                    <div className="w-full max-w-md space-y-2">
                        <PhoneNumberInput
                            setPhoneNumber={(value) => {
                                setPhoneNumber(value);
                                setPhoneNumberError("");
                            }}
                            setCountryCode={(value) => {
                                setCountryCode(value);
                                setPhoneNumberError("");
                            }}
                        />
                        {phoneNumberError && (
                            <p className="text-sm text-red-500">
                                {phoneNumberError}
                            </p>
                        )}
                    </div>
                    <Button onClick={savePhoneNumber}>
                        {hasPassword ? "Save" : "Next"}
                    </Button>
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold">Set your password</h1>
                    <div className="w-full max-w-md space-y-2">
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError("");
                            }}
                            onKeyDown={handlePasswordKeyPress}
                            required
                        />
                        {passwordError && (
                            <p className="text-sm text-red-500">
                                {passwordError}
                            </p>
                        )}
                    </div>
                    <Button
                        disabled={!password}
                        type="submit"
                        onClick={savePassword}
                    >
                        Save
                    </Button>
                </>
            )}
        </div>
    );
};

export default SaveDetailsPage;
