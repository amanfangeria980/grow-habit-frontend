"use client";
import { useEffect, useState } from "react";

// To do : define the interface reflections
interface Reflections {}

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

    useEffect(() => {
        console.log(reflections);
    }, [reflections]);

    const TdComp = ({ children }: { children: any }) => {
        return <td className="border-2 border-black px-2">{children}</td>;
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
                                    <TdComp>{ref.testDay}</TdComp>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
