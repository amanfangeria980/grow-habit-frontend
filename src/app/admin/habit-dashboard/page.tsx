"use client";

import { useState, useEffect } from "react";
import { StatsComponent } from "./_components/StatsComponent";

export default function Page() {
    const [reflections, setReflections] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const updateReflections = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-reflections`
        );
        const repData = await response.json();
        console.log("This is what I fetched from the backend ", repData);
        setReflections(repData.data);
    };

    useEffect(() => {
        const useFunction = async () => {
            await updateReflections();
        };

        useFunction();
    }, []);

    const users = Array.from(new Set(reflections.map((r: any) => r.name)));

    const uniDays = Array.from(
        new Set(reflections.map((r: any) => r.testDay))
    ).sort((a: any, b: any) => a - b);

    const dataMatrix: Record<number, Record<string, string>> = {};

    uniDays.forEach((day: any) => {
        dataMatrix[day] = {}; // Initialize an inner object for the day
        users.forEach((user: any) => {
            const reflection = reflections.find(
                (r: any) => r.testDay === day && r.name === user
            );
            dataMatrix[day][user] = reflection ? reflection.commitment : "-";
        });
    });

    // uniDays.forEach((day: any)=>{
    //     dataMatrix[day] = {}
    //     users.map((user : any)=>{
    //         const reflection = reflections.find((r : any)=> r.name === user && r.testDay === day)
    //         dataMatrix[day][user] = reflection ? reflections.commitment : '-'
    //     })
    // })

    const TdComp = ({ children }: { children: any }) => {
        return <td className="border-2 border-black px-2">{children}</td>;
    };
    return (
        <>
            <div>This is the habit group dashboard </div>
            <div className="m-2">
                <h2>This is the raw reflections </h2>
                {
                    JSON.stringify(reflections)
                }
            </div>
            {
                <div>
                    <h2>Users</h2>
                    <h2>UniDays</h2>
                    <div>{JSON.stringify(uniDays)}</div>
                    <div>{JSON.stringify(dataMatrix)}</div>
                </div>
            }

            <div>
                <table className="border-2 border-black">
                    <thead>
                        <tr>
                            <th className="border-2 border-black px-2">Day</th>
                            {users.map((user: any) => (
                                <th
                                    key={user}
                                    className="border-2 border-black px-2"
                                >
                                    {user}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {uniDays.map((day: any) => (
                            <tr key={day}>
                                <TdComp>{day}</TdComp>
                                {users.map((user: any) => (
                                    <TdComp key={`${day}-${user}`}>
                                        {dataMatrix[day][user]}
                                    </TdComp>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <StatsComponent reflections={reflections} users={users} uniDays={uniDays} dataMatrix={dataMatrix}/>
            </div>
        </>
    );
}
