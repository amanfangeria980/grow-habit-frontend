"use client"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function UserHome() {

    const [recordsArray, setRecordsArray] = useState<any>([])
    // const [username, setUsername] = useState<string | null>(null)
    const searchParams = useSearchParams() ; 
    const usernameFromURL = searchParams.get('username')
   ;





    const getReflections = async()=>{

        const username = usernameFromURL ; 


        try{


    
        
        

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-user-reflections?username=${username}`, {method : "GET"})
        // const repData = await response.json() ; 
        // console.log("this is repData fetched from backend ", repData )

        }
        catch(error)
        {
            console.log("the error at getReflections is ", error)
        }

    }

    useEffect(()=>{
        const usingEffect = async()=>{
            await getReflections()
        }

        usingEffect() ; 
    },[usernameFromURL])
    return (
        <>
            <div className="p-4 bg-gray-100 min-h-screen">
                <div className="text-center mb-4">
                    <h1 className="text-xl font-semibold">Hi, Parth</h1>
                    <p className="text-gray-600 mt-2">Your two-pointer status for today is:</p>
                </div>

                <div className="grid grid-cols-7 gap-[0.1px] justify-center">
                    {recordsArray.map((item : any) => (
                        <div key={item.day} className="flex flex-col items-center">
                            <div
                                className={`w-5 h-5 ${
                                    item.value === "yes"
                                        ? "bg-green-300 border-green-400"
                                        : "bg-red-300 border-red-400"
                                } border-2`}
                            ></div>
                            <p className="mt-2 text-sm font-medium text-gray-700">Day {item.day}</p>
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
