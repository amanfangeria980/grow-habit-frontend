"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface Reflection {
    id: string;
    timestamp: string;
    name: string;
    day: number;
    commitment: string;
    testDay: number;
}

export default function Page() {
    const [reflections, setReflections] = useState<Reflection[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [editFlag, setEditFlag] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);

        // Get day with ordinal suffix
        const day = date.getDate();
        const ordinal = (day: number) => {
            if (day > 3 && day < 21) return "th";
            switch (day % 10) {
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th";
            }
        };

        // Format the date parts
        const formattedDate = `${day}${ordinal(day)} ${date.toLocaleString(
            "en-US",
            { month: "short" }
        )}, ${date.getFullYear()}`;
        const formattedTime = date.toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });

        return `${formattedDate} | ${formattedTime}`;
    };

    const updateReflections = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-reflections`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch reflections");
            }
            const repData = await response.json();
            setReflections(repData.data);
        } catch (error) {
            setError("Failed to fetch reflections");
            console.error("Error fetching reflections:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (ref: Reflection) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/delete-reflection`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ data: ref }),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to delete reflection");
            }
            const repData = await response.json();
            setDeleteMessage(repData.message);
            // Refresh reflections after successful delete
            updateReflections();
        } catch (error) {
            setError("Failed to delete reflection");
            console.error("Error deleting reflection:", error);
        }
    };

    useEffect(() => {
        updateReflections();
    }, []);

    const TdComp = ({
        children,
        classname,
    }: {
        children: React.ReactNode;
        classname?: string;
    }) => {
        return (
            <td className={clsx("border-2 border-black px-2", classname)}>
                {children}
            </td>
        );
    };

    if (loading) {
        return <div>Loading reflections...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <>
            <div>This is the form reflections page</div>
            <div>
                <table className="border-2 border-black">
                    <thead>
                        <tr>
                            <th className="border-2 border-black px-2">
                                Timestamp
                            </th>
                            <th className="border-2 border-black px-2">Name</th>
                            <th className="border-2 border-black px-2">Day</th>
                            <th className="border-2 border-black px-2">
                                Commitment
                            </th>
                            <th className="border-2 border-black px-2">
                                Test Day
                            </th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reflections.map((ref) => (
                            <tr key={ref.id}>
                                <TdComp>
                                    {formatTimestamp(ref.timestamp)}
                                </TdComp>
                                <TdComp>{ref.name}</TdComp>
                                <TdComp>{ref.day}</TdComp>
                                <TdComp>{ref.commitment}</TdComp>
                                <TdComp>
                                    {editFlag ? (
                                        <div>
                                            <input
                                                type="text"
                                                className="px-2 border-2 border-black rounded-md"
                                            />
                                        </div>
                                    ) : (
                                        ref.testDay
                                    )}
                                </TdComp>
                                <TdComp>
                                    <button
                                        className="bg-black text-white rounded-md m-1 p-1"
                                        onClick={() => handleDelete(ref)}
                                    >
                                        Delete
                                    </button>
                                </TdComp>
                                <TdComp classname="bg-black text-white rounded-md m-1 p-1">
                                    Edit
                                </TdComp>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
