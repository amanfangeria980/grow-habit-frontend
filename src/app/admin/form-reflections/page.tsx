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
    const [editFlag, setEditFlag] = useState<string | null>(null);
    const [editDayValue, setEditDayValue] = useState<string>("");
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

    const handleEdit = (ref: Reflection) => {
        setEditDayValue(ref.testDay.toString());
        setEditFlag(ref.id);
    };

    const handleSave = async (ref: Reflection) => {
        try {
            const newTestDay = parseInt(editDayValue.trim());

            if (isNaN(newTestDay) || newTestDay < 1 || newTestDay > 25) {
                setError("Please enter a valid day between 1 and 25");
                return;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/update-reflection`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        updatedDay: newTestDay,
                        reflectionData: ref,
                    }),
                }
            );

            const data = await response.json();

            if (!data.success) {
                setError(data.message);
                return;
            }

            // Update local state
            setReflections((prevReflections) =>
                prevReflections.map((r) =>
                    r.id === ref.id ? { ...r, testDay: newTestDay } : r
                )
            );
            setEditFlag(null);
            setEditDayValue("");
        } catch (error) {
            setError("Failed to update reflection");
            console.error("Error updating reflection:", error);
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
            <td className={clsx("border-2 border-black px-4 py-2", classname)}>
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
            <div className="flex justify-center">
                <table className="border-2 border-black">
                    <thead>
                        <tr>
                            <th className="border-2 border-black px-4 py-2 min-w-[200px]">
                                Timestamp
                            </th>
                            <th className="border-2 border-black px-4 py-2 min-w-[100px]">
                                Name
                            </th>
                            <th className="border-2 border-black px-4 py-2 min-w-[80px]">
                                Day
                            </th>
                            <th className="border-2 border-black px-4 py-2 min-w-[150px]">
                                Commitment
                            </th>
                            <th className="border-2 border-black px-4 py-2 min-w-[100px]">
                                Test Day
                            </th>
                            <th className="border-2 border-black px-4 py-2">
                                Edit
                            </th>
                            <th className="border-2 border-black px-4 py-2">
                                Delete
                            </th>
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
                                    {editFlag === ref.id ? (
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                className="px-2 border-2 border-black rounded-md w-20"
                                                value={editDayValue}
                                                onChange={(e) =>
                                                    setEditDayValue(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="1-25"
                                            />
                                            <button
                                                className="bg-green-600 text-white rounded-md px-3 py-1"
                                                onClick={() => handleSave(ref)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="bg-gray-600 text-white rounded-md px-3 py-1"
                                                onClick={() => {
                                                    setEditFlag(null);
                                                    setEditDayValue("");
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <span>{ref.testDay}</span>
                                    )}
                                </TdComp>
                                <TdComp>
                                    {!editFlag && (
                                        <button
                                            className="bg-blue-600 text-white rounded-md px-3 py-1"
                                            onClick={() => handleEdit(ref)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </TdComp>
                                <TdComp>
                                    <button
                                        className="bg-black text-white rounded-md px-3 py-1"
                                        onClick={() => handleDelete(ref)}
                                    >
                                        Delete
                                    </button>
                                </TdComp>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
