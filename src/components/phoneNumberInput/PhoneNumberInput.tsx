"use client";
import React, { useEffect } from "react";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const phoneNumberSchema = z.object({
    countryCode: z.string().min(1, "Country code is required"),
    phoneNumber: z
        .string()
        .min(1, "Phone number is required")
        .min(10, "Phone number must be at least 10 characters")
        .regex(
            /^\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/,
            "Please enter a valid phone number"
        ),
});

type PhoneNumberFormData = z.infer<typeof phoneNumberSchema>;

const PhoneNumberInput = ({
    setPhoneNumber,
    setCountryCode,
}: {
    setPhoneNumber: (phoneNumber: string) => void;
    setCountryCode: (countryCode: string) => void;
}) => {
    const {
        register,
        watch,
        setValue,
        trigger,
        formState: { errors },
    } = useForm<PhoneNumberFormData>({
        resolver: zodResolver(phoneNumberSchema),
        defaultValues: {
            countryCode: "+91",
            phoneNumber: "",
        },
        mode: "onChange",
    });

    return (
        <div className="w-full max-w-md space-y-4">
            <div className="flex items-center gap-2">
                <PhoneInputWithCountrySelect
                    defaultCountry="IN"
                    international
                    withCountryCallingCode
                    value={watch("countryCode")}
                    onChange={(value) => {
                        const countryCode = value?.split(" ")[0] || "";
                        setValue("countryCode", countryCode);
                        setCountryCode(countryCode);
                        trigger("countryCode");
                    }}
                    className="max-w-[28%]"
                    numberInputProps={{
                        className:
                            "rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    }}
                />
                <Input
                    {...register("phoneNumber", {
                        required: "Phone number is required",
                        onChange: (e) => {
                            trigger("phoneNumber");
                            setPhoneNumber(e.target.value);
                        },
                        onBlur: () => trigger("phoneNumber"),
                    })}
                    type="text"
                    placeholder="Enter phone number"
                    className="flex-1"
                />
            </div>
            {(errors.phoneNumber || errors.countryCode) && (
                <p className="mt-1 text-xs text-red-600">
                    {errors.phoneNumber?.message || errors.countryCode?.message}
                </p>
            )}
        </div>
    );
};

export default PhoneNumberInput;
