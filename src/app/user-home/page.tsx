"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import "@/styles/animations.css";
import LoadingComponent from "@/components/loader/LoadingComponent";
import { useUserFromTanstack } from "@/hooks/useUserFromTanstack";
import { HabitGrid } from "./_components/HabitGrid";

export default function UserHome() {
    const user = useUserFromTanstack();
    const [selectedUser, setSelectedUser] = useState<Record<string, string>>({});
    const [allUsers, setAllUsers] = useState<any>([]);
    // Add new useEffect to update selectedName when user data changes
    useEffect(() => {
        if (user?.name) {
            setSelectedUser({userId : user.id, userName : user.name});
        }
    }, [user?.name]);
    const router = useRouter();

    const [recordsArray, setRecordsArray] = useState<
        Array<{ value: string; day: number }>
    >([]);
    const [loading, setLoading] = useState(true);
    const today = new Date().getDate();

    const fetchUserData = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/user-graph/${selectedUser.userId}`
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

    const fetchAllUsers = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-all-users`,
            { method: "GET" }
        );
        const repData = await response.json();
        console.log(
            "This is the data of the users fetched from the backend ",
            repData
        );
        setAllUsers(repData.data);
    };

    useEffect(() => {
        const fetchDetails = async () => {
            await fetchAllUsers();
        };

        fetchDetails();
    }, []);

    useEffect(() => {
        const fetchDetails = async () => {
            await fetchUserData();
        };

       

        fetchDetails();
    }, [selectedUser]);

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <>
            <div className="p-4 bg-gray-100 min-h-screen">
                <div className="mb-6">
                
                    <Select
                        value={selectedUser.userId}
                        onValueChange={(value) => { 
                            const selected = allUsers.find((u : any)=>(u.userId === value))
                            setSelectedUser(selected) 
                        
                        
                        } }
                    >
                        <SelectTrigger className="w-full bg-white rounded-lg py-3 px-4 text-left text-gray-600 flex justify-between items-center shadow-xl h-12">
                            <SelectValue placeholder="Select name" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            {allUsers.map((user: any) => (
                                <SelectItem key={user.userId} value={user.userId}>
                                    {user.userName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="text-center mb-4">
                    <h1 className="text-xl font-semibold">
                        Hi, {selectedUser.userName || "Select User"}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Your two-pointer status for today is:
                    </p>
                </div>

                <HabitGrid recordsArray={recordsArray} today={today} />

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
