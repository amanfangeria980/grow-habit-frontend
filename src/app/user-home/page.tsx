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
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { queryObjects } from "v8";

// let's try to create a mainUserDetails 


export default function UserHome() {
    const user = useUserFromTanstack();
    const [selectedUser, setSelectedUser] = useState<Record<string, string>>({});
    const [mainUserDetails, setMainUserDetails] = useState<any>({}) ; 
    const [allUsers, setAllUsers] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [isMnkPresent, setIsMnkPresent] = useState(false) ; 
    const today = new Date().getDate();
    // Add new useEffect to update selectedName when user data changes

    const setUserDetails = async(userId : string)=>{

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-user-details`, {method : "POST", headers : {'Content-Type' : 'application/json'}, body : JSON.stringify({userId : userId})})
        const repData = await response.json() ; 

        const data = repData.data ;

        console.log("this is the details of the user ", data) ; 

        setMainUserDetails(data) ; 



    }

    // This is the useEffect which checks which sets the current user details in the state 
    useEffect(() => {

        const fetchDetails = async(userId : string)=>{
    
            await setUserDetails(userId)
        }
        if (user?.name) {
            setSelectedUser({userId : user.id, userName : user.name});
            fetchDetails(user.id) 
        }


    }, [user?.name]);
    const router = useRouter();

    const [recordsArray, setRecordsArray] = useState<
        Array<{ value: string; day: number }>
    >([]);
    

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
        console.log("The value of mnk of the main user is", mainUserDetails.mnk)

        if(mainUserDetails && Object.keys(mainUserDetails).length !== 0)
        {

            if(mainUserDetails.mnk !== null)
                {
                    console.log("Hey , hey , hey I am here and working")
                    setIsMnkPresent(true) ; 
                    const fetchDetails = async () => {
                        await fetchAllUsers();
                    };
            
                    fetchDetails();
                    setLoading(false)
        
                }
                else
                {
                    setLoading(false)
                }

        }
        
        
    }, [mainUserDetails]);

    useEffect(() => {
        const fetchDetails = async () => {
            await fetchUserData();
        };

       

        fetchDetails();
    }, [selectedUser]);

    if (loading) {
        return <LoadingComponent />;
    }

    if(!loading && !isMnkPresent )
    {
        return(
            <NotMnkComponent />
        )
    }

    return (
        <>
        <div>
            this is the value of "isMnkPreset" : {isMnkPresent.toString()}
            <p>This is the value of "mnkUserDetails.mnk" {JSON.stringify(mainUserDetails.mnk)}</p>
        </div>
        <div>
            {JSON.stringify(mainUserDetails)}
        </div>
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


function NotMnkComponent(){

    const [mnkGroup, setMNKGroups] = useState<any>([])
    

    

    const fetchMNKGroups = async()=>{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-all-mnk`, {method : "GET", headers : {'Content-Type' : 'application/json'}})
        const repData = await response.json() ; 
        const data = repData.data ; 
        console.log("this is the data fetched from the api ", repData) ; 
        setMNKGroups(data) ; 
    }

    useEffect(()=>{
        fetchMNKGroups()
    },[])

  

   

    return(<>

    <div >



        <div>
            <CardHeader className="text-center text-3xl font-bold">Join a Habit Accountability Group</CardHeader>
        </div>

        <div className="flex py-2 items-center justify-center gap-2">

            <Input placeholder="search groups" className="w-[30%]" />
            <Card className="border-2 rounded-sm px-2"> Search </Card>
            
        </div>

        <div className="my-2 mx-[20%] ">

            {
                Object.keys(mnkGroup).length !== 0 ? (
                    <div>
                        {
                            mnkGroup.map((group : {name : string, id : string})=>{

                                return(
                                    <Card key={group.id} className="flex justify-between items-center my-1 mx-1 p-2 rounded-sm shadow-sm border">
                                    <p className="text-sm font-medium">{group.name}</p>
                                    <Button size="sm" className="px-2 py-0.5 text-xs">Request To Join</Button>
                                    <Button size="sm" className="px-2 py-0.5 text-xs">See Details</Button>
                                </Card>
                                

                                )

                            })
                        }
                    </div>
                ) : <div>No MNK groups available right now. <Button>Create one </Button></div>
            } 

        </div>


        </div>
    
    
    </>)

}
