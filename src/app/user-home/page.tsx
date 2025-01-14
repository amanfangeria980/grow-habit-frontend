"use client";
import { useState, useEffect } from "react";
import { usersAll } from "@/lib/data";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function UserHome() {
    const [selectedName, setSelectedName] = useState<string>("parth");
    const [recordsArray, setRecordsArray] = useState<
        Array<{ value: string; day: number }>
    >([]);
    const [loading, setLoading] = useState(true);
    const today = new Date().getDate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/user-graph/${selectedName}`
                );
                const data = await response.json();
                if (data.success) {
                    setRecordsArray(data.data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [selectedName]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="p-4 bg-gray-100 min-h-screen">
                <div className="mb-6">
                    <Select
                        value={selectedName}
                        onValueChange={(value) => setSelectedName(value)}
                    >
                        <SelectTrigger className="w-full bg-white rounded-lg py-3 px-4 text-left text-gray-600 flex justify-between items-center shadow-xl h-12">
                            <SelectValue placeholder="Select name" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            {usersAll.map((user, index) => (
                                <SelectItem key={index} value={user}>
                                    {user}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="text-center mb-4">
                    <h1 className="text-xl font-semibold">
                        Hi, {selectedName}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Your two-pointer status for today is:
                    </p>
                </div>

                <div className="grid grid-cols-5 gap-4 justify-center max-w-3xl mx-auto">
                    {recordsArray.map((item) => (
                        <div
                            key={item.day}
                            className="flex flex-col items-center p-2"
                        >
                            <div
                                className={`w-8 h-8 rounded-md ${
                                    item.day >= today
                                        ? "bg-slate-200 border-slate-300"
                                        : item.value === "no"
                                        ? "bg-red-300 border-red-400"
                                        : item.value === "gateway"
                                        ? "bg-yellow-300 border-yellow-400"
                                        : item.value === "plus"
                                        ? "bg-green-300 border-green-400"
                                        : item.value === "elite"
                                        ? "bg-green-600 border-green-700"
                                        : "bg-red-300 border-red-400"
                                } border-2`}
                            ></div>
                            <p className="mt-2 text-xs font-medium text-gray-700">
                                Day {item.day}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    <h2>Weekly Score card : 1 - 7 </h2>
                    <div>
                        <h2>Level 1 : Check/ uncheck </h2>
                        <p>Reflection Score : </p>
                        <p>Gateway Score : </p>
                    </div>
                    <div>
                        <h2>Level 2 : Check / Uncheck </h2>
                        <p> Cue Rate : </p>
                        <p>Plus Score : </p>
                    </div>
                    <div>
                        <h2>Level 3 : Check / Uncheck</h2>
                        <p>Frequent connection with commrade pair </p>
                        <p> Constantly Updating your plus statement </p>
                    </div>
                </div>
            </div>
        </>
    );
}
