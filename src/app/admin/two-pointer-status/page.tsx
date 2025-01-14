"use client";

import { useState } from "react";
import { usersAll } from "@/lib/data";

// Define TypeScript interfaces
interface StatusData {
    username: string;
    status: string;
}

const Page = () => {
    const [day, setDay] = useState<string>("");
    const [finStatus, setFinStatus] = useState<StatusData[]>([]);

    const sendWhatsappMessage = async () => {
        // const phoneNumbers = 917078609133;
        const phoneNumbers = process.env.NEXT_PUBLIC_PHONE_NUMBER;

        if (finStatus.length === 0) {
            alert("Please generate the two pointer status first");
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/whatsapp/send-text-message`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ phoneNumbers, finStatus }),
                }
            );
            const repData = await response.json();
            console.log("WhatsApp message sent successfully", repData);
        } catch (error) {
            console.error("Error sending WhatsApp message:", error);
        }
    };

    const fetchTwoPointerStatus = async (username: string, day: number) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-two-pointer-status`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, day }),
                }
            );
            const repData = await response.json();
            let { dayYesterday, dayBeforeYesterday } = repData.data;

            // Convert empty strings to "no"
            dayYesterday = dayYesterday === "" ? "no" : dayYesterday;
            dayBeforeYesterday =
                dayBeforeYesterday === "" ? "no" : dayBeforeYesterday;

            // Helper function to check valid status
            const isValidStatus = (status: string) =>
                ["gateway", "plus", "elite"].includes(status);

            // Determine status based on conditions
            const status =
                (isValidStatus(dayYesterday) &&
                    isValidStatus(dayBeforeYesterday)) ||
                (isValidStatus(dayYesterday) && dayBeforeYesterday === "no")
                    ? "duck"
                    : dayYesterday === "no" && isValidStatus(dayBeforeYesterday)
                    ? "crab"
                    : "cross";

            // Only add if user doesn't exist in finStatus
            setFinStatus((prevStatus) => {
                const userExists = prevStatus.some(
                    (s) => s.username === username
                );
                if (!userExists) {
                    return [...prevStatus, { username, status }];
                }
                return prevStatus;
            });
        } catch (error) {
            console.error(`Error fetching status for user ${username}:`, error);
        }
    };

    const calculateTwoPointer = async (day: number) => {
        setFinStatus([]);
        await Promise.all(
            usersAll.map((user) => fetchTwoPointerStatus(user, day))
        );
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
                Two Pointer Status Generator
            </h1>

            <div className="flex gap-4 items-center mb-8">
                <input
                    type="number"
                    className="border-2 border-gray-300 rounded-md p-2"
                    min={1}
                    max={25}
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    placeholder="Enter day (1-25)"
                />
                <button
                    onClick={() => calculateTwoPointer(parseInt(day, 10))}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300"
                    disabled={!day || isNaN(parseInt(day, 10))}
                >
                    Generate Status
                </button>
                <button
                    onClick={sendWhatsappMessage}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    disabled={finStatus.length === 0}
                >
                    Send WhatsApp Message
                </button>
            </div>

            {finStatus.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">
                        Status for Day {day}
                    </h2>
                    <div className="space-y-2">
                        {finStatus.map((status) => (
                            <div
                                key={status.username}
                                className="flex justify-between items-center border-b pb-2"
                            >
                                <span>{status.username}</span>
                                <span
                                    className={`px-2 py-1 rounded ${
                                        status.status === "duck"
                                            ? "bg-green-100 text-green-800"
                                            : status.status === "crab"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {status.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
