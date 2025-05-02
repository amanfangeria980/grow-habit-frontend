"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const NoMNKGroupScreen = () => {
    const { data: authData } = useSession();
    const getMNKGroups = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-mnk-groups`
        );
        const data = await response.json();
        return data;
    };

    const { data: mnkGroups } = useQuery({
        queryKey: ["mnkGroups"],
        queryFn: () => getMNKGroups(),
    });

    const sendRequestToJoinMNKGroup = async (
        groupId: string,
        userId: string,
        userName: string,
        groupName: string
    ) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/send-mnk-join-request`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        groupId,
                        userId,
                        name: userName,
                        groupName,
                    }),
                }
            );
            const data = await response.json();

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message || "Failed to send join request");
            }
        } catch (error) {
            toast.error("An error occurred while sending the request");
            console.error("Error sending join request:", error);
        }
    };
    return (
        <div className="min-h-screen bg-white">
            {/* Main Content */}
            <div className="flex flex-col items-center justify-center p-6 mt-20">
                <div className="w-full max-w-2xl space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900">
                            No MNK Group Found
                        </h1>
                        <p className="text-lg text-gray-600">
                            Join a group to start your habit-building journey
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Available Groups
                        </h2>
                        <div className="space-y-3">
                            {mnkGroups?.data?.map((group: any) => (
                                <div
                                    key={group.id}
                                    className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-gray-300 transition-all duration-200 flex items-center justify-between"
                                >
                                    <span className="text-lg font-medium text-gray-800">
                                        {group.name}
                                    </span>
                                    <button
                                        className="px-8 py-2 bg-[#4285f4] text-white rounded-md hover:bg-blue-600 transition-colors text-lg"
                                        onClick={() => {
                                            sendRequestToJoinMNKGroup(
                                                group.id,
                                                authData?.user?.id || "",
                                                authData?.user?.name || "",
                                                group.name
                                            );
                                        }}
                                    >
                                        Join
                                    </button>
                                </div>
                            ))}
                        </div>
                        {(!mnkGroups?.data || mnkGroups.data.length === 0) && (
                            <p className="text-center text-gray-500 italic">
                                No groups available at the moment
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoMNKGroupScreen;
