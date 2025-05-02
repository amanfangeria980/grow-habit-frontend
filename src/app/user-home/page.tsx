"use client";
import { useState, useEffect } from "react";
import { usersAll } from "@/lib/data";
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
import { useSession } from "next-auth/react";
import NoMNKGroupScreen from "./_components/NoMNKGroupScreen";

export default function UserHome() {
    // const user = useUserFromTanstack();
    const { data: authData } = useSession();
    const [selectedName, setSelectedName] = useState<string>("parth");
    const [recordsArray, setRecordsArray] = useState<
        Array<{ value: string; day: number }>
    >([]);
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState<any>(null);
    const today = new Date().getDate();

    const fetchUserDetails = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-user-details/${authData?.user?.id}`
            );
            const data = await response.json();
            if (data.user) {
                setUserDetails(data.user);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authData?.user?.id) {
            fetchUserDetails();
        }
    }, [authData?.user?.id]);

    // Add new useEffect to update selectedName when user data changes
    // useEffect(() => {
    //     if (user?.name) {
    //         setSelectedName(user.name.split(" ")[0].toLowerCase());
    //     }
    // }, [user?.name]);

    // console.log("user : ", user);
    // const router = useRouter();

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await fetch(
    //                 `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/user-graph/${selectedName}`
    //             );
    //             const data = await response.json();
    //             if (data.success) {
    //                 setRecordsArray(data.data);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching user data:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchUserData();
    // }, [selectedName]);

    if (loading) {
        return <LoadingComponent />;
    }
    if (!userDetails?.mnk) {
        return (
            <>
                <NoMNKGroupScreen />
            </>
        );
    }
    // return (
    //     <>
    //         <div className="p-4 bg-gray-100 min-h-screen">
    //             <div className="mb-6">
    //                 <Select
    //                     value={selectedName}
    //                     onValueChange={(value) => setSelectedName(value)}
    //                 >
    //                     <SelectTrigger className="w-full bg-white rounded-lg py-3 px-4 text-left text-gray-600 flex justify-between items-center shadow-xl h-12">
    //                         <SelectValue placeholder="Select name" />
    //                     </SelectTrigger>
    //                     <SelectContent className="bg-white">
    //                         {usersAll.map((user, index) => (
    //                             <SelectItem key={index} value={user}>
    //                                 {user}
    //                             </SelectItem>
    //                         ))}
    //                     </SelectContent>
    //                 </Select>
    //             </div>

    //             <div className="text-center mb-4">
    //                 <h1 className="text-xl font-semibold">
    //                     Hi, {selectedName}
    //                 </h1>
    //                 <p className="text-gray-600 mt-2">
    //                     Your two-pointer status for today is:
    //                 </p>
    //             </div>

    //             <HabitGrid recordsArray={recordsArray} today={today} />

    //             <div className="mt-10">
    //                 <h2>Weekly Score card : 1 - 7 </h2>
    //                 <div>
    //                     <h2>Level 1 : Check/ uncheck </h2>
    //                     <p>Reflection Score : </p>
    //                     <p>Gateway Score : </p>
    //                 </div>
    //                 <div>
    //                     <h2>Level 2 : Check / Uncheck </h2>
    //                     <p> Cue Rate : </p>
    //                     <p>Plus Score : </p>
    //                 </div>
    //                 <div>
    //                     <h2>Level 3 : Check / Uncheck</h2>
    //                     <p>Frequent connection with commrade pair </p>
    //                     <p> Constantly Updating your plus statement </p>
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // );
}
