"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";

// To do : define the interface reflections
interface Reflections {}

export default function Page() {
    const [reflections, setReflections] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [editFlag, setEditFlag] = useState<boolean>(false) ; 

    const updateReflections = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-reflections`
        );
        const repData = await response.json();
        console.log("This is what I fetched from the backend ", repData);
        setReflections(repData.data);
    };

    const handleDelete = async(ref : any)=>{

        console.log("This is the value of ref from delete button ", ref)


        const sendData = {

            data  : ref 
        
        }

         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/delete-reflection`, { method : "POST", headers : {'Content-Type' : "application/json"}, body : JSON.stringify(sendData)})
         const repData = await response.json() ; 
         console.log("The data from the backend ( delete-reflections ) is ", repData)

    }

    useEffect(() => {
        const useFunction = async () => {
            await updateReflections();
        };

        useFunction();
    }, []);

    useEffect(() => {
        console.log(reflections);
    }, [reflections]);

    useEffect(()=>{


    })

    const TdComp = ({ children, classname }: { children: any , classname?: string}) => {
        return <td className={clsx("border-2 border-black px-2",classname)}>{children}</td>;
    };

    return (
        <>
            <div>This is the form reflections page </div>

            <div>
                <table className="border-2 border-black">
                    <thead>
                        <tr>
                            <th className="border-2 border-black px-2">
                                {" "}
                                Timestamp{" "}
                            </th>
                            <th className="border-2 border-black px-2">Name</th>
                            <th className="border-2 border-black px-2">day</th>
                            <th className="border-2 border-black px-2">
                                commitment
                            </th>
                            <th className="border-2 border-black px-2 ">
                                testDay
                            </th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reflections.map((ref: any) => {
                            return (

                              
                                
                                
                                
                                

                               
                                <tr key={ref.id}>
                                    <TdComp>{ref.timestamp}</TdComp>
                                    <TdComp>{ref.name}</TdComp>
                                    <TdComp>{ref.day}</TdComp>
                                    <TdComp>{ref.commitment}</TdComp>
                                    <TdComp classname="">{ editFlag ? <div><input type="text" className="px-2 border-2 border-black rounded-md" /></div> : ref.testDay}</TdComp>
                                  
                                   
                                    <TdComp classname=""><button className="bg-black text-white rounded-md m-1 p-1" onClick={()=>{handleDelete(ref)}}>Delete</button></TdComp>
                                    <TdComp classname="bg-black text-white rounded-md m-1 p-1">Edit</TdComp>
                                    
                                </tr>

                               

                                

                               

                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
