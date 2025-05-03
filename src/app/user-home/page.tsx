"use client";
import { useState, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import "@/styles/animations.css";
import LoadingComponent from "@/components/loader/LoadingComponent";
import { HabitGrid } from "./_components/HabitGrid";
import { useSession } from "next-auth/react";
import NoMNKGroupScreen from "./_components/NoMNKGroupScreen";

export default function UserHome() {
    const { data: authData } = useSession();
    const [selectedUserId, setSelectedUserId] = useState<string>("");
    const [recordsArray, setRecordsArray] = useState<
        Array<{ value: string; day: number }>
    >([]);
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState<any>(null);
    const today = new Date().getDate();
    const [mnkUsers, setMnkUsers] = useState<any[]>([]);

    const fetchUserDetails = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-user-details/${authData?.user?.id}`
            );
            const userData = await response.json();
            if (userData.data) {
                setUserDetails(userData.data);
                setSelectedUserId(userData.data.id);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        } finally {
            setLoading(false);
        }
    };

    const getMNKUsers = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-mnk-users/${userDetails?.mnk?.mnkId}`
            );
            const mnkUsersData = await response.json();
            if (mnkUsersData.success) {
                setMnkUsers(mnkUsersData.data);
            } else {
                console.error(
                    "Failed to fetch MNK users:",
                    mnkUsersData.message
                );
            }
        } catch (error) {
            console.error("Error fetching mnk users:", error);
        }
    };

    const fetchUserGraph = async (userId: string) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/user-graph/${userId}`
            );
            const data = await response.json();
            if (data.success) {
                setRecordsArray(data.data);
            } else {
                console.error("Failed to fetch user graph:", data.message);
            }
        } catch (error) {
            console.error("Error fetching user graph:", error);
        }
    };

    useEffect(() => {
        if (authData?.user?.id) {
            fetchUserDetails();
        }
    }, [authData?.user?.id]);

    useEffect(() => {
        if (userDetails?.mnk) {
            getMNKUsers();
        }
    }, [userDetails]);

    useEffect(() => {
        if (selectedUserId) {
            fetchUserGraph(selectedUserId);
        }
    }, [selectedUserId]);

    if (loading) {
        return <LoadingComponent />;
    }
    if (userDetails?.mnk === null) {
        return <NoMNKGroupScreen />;
    }

    return (
        <div className="p-4">
            <h1 className="mb-4">
                You are part of
                <span className="font-bold underline">
                    {" "}
                    {userDetails?.mnk?.mnkName}
                </span>
            </h1>

            <div className="mb-6">
                <Select
                    value={selectedUserId}
                    onValueChange={(value) => setSelectedUserId(value)}
                >
                    <SelectTrigger className="w-full bg-white rounded-lg py-3 px-4 text-left text-gray-600 flex justify-between items-center shadow-xl h-12">
                        <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        {mnkUsers.map((user) => (
                            <SelectItem key={user.userId} value={user.userId}>
                                {user.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {selectedUserId && recordsArray.length > 0 && (
                <div>
                    <HabitGrid recordsArray={recordsArray} today={today} />
                </div>
            )}
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
    );
}
