"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { GroupCard } from "./_components/GroupCard";
import { GroupCardDetails } from "./_components/GroupCardDetails";
import { CreateMNKModal } from "./_components/CreateMNKModal";

export default function Page() {
    const [openMNK, setOpenMNK] = useState<boolean>(false);
    const [mnkName, setMnkName] = useState<string>("");
    const [mnkGroups, setMNKGroups] = useState<any>([]);
    const [openGroup, setOpenGroup] = useState<any>(null);
    const [mnkUsers, setMNKUsers] = useState<any>([]);
    const [openMNKDetails, setOpenMNKDetails] = useState<any>(null);

    const handleCreateMNK = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/create-mnk`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: mnkName }),
                }
            );
            const repData = await response.json();
            if (repData.message) {
                await fetchMNKGroups();
            }
            setOpenMNK(false);
            setMnkName("");
        } catch (error) {
            console.error("Error creating MNK group:", error);
        }
    };

    const fetchMNKGroups = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-mnk-groups`
        );
        const repData = await response.json();
        setMNKGroups(repData.data || []);
        // Set the first group as selected if there are groups and no group is currently selected
        if (repData.data?.length > 0 && !openMNKDetails) {
            setOpenMNKDetails(repData.data[0]);
        }
    };

    const fetchMNKUsers = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users-eligible-for-mnk`
            );
            const repData = await response.json();
            if (repData.success) {
                setMNKUsers(repData.data);
            } else {
                console.error(
                    "Failed to fetch eligible users:",
                    repData.message
                );
            }
        } catch (error) {
            console.error("Error fetching eligible users:", error);
        }
    };

    useEffect(() => {
        fetchMNKUsers();
        fetchMNKGroups();
    }, []);

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Section - MNK Groups List */}
                <div className="w-full lg:w-2/5">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold mb-4">
                            MNK Groups Management
                        </h1>
                        <Button
                            onClick={() => setOpenMNK(true)}
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                        >
                            Create New MNK Group
                        </Button>
                    </div>

                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl">
                                All MNK Groups
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {mnkGroups && mnkGroups.length > 0 ? (
                                mnkGroups.map((group: any) => (
                                    <Card
                                        key={group.id}
                                        className={`p-4 transition-colors cursor-pointer ${
                                            openMNKDetails?.id === group.id
                                                ? "bg-blue-50 border-blue-200"
                                                : "hover:bg-gray-50"
                                        }`}
                                        onClick={() => setOpenMNKDetails(group)}
                                    >
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                                            <h2 className="text-lg font-semibold">
                                                {group.name}
                                            </h2>
                                            <Button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenGroup(group);
                                                }}
                                                size="sm"
                                                className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700"
                                            >
                                                Add Users
                                            </Button>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <div className="text-center py-6 text-gray-500">
                                    No MNK groups created yet
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Section - Group Details */}
                <div className="w-full lg:w-3/5">
                    {openMNKDetails ? (
                        <GroupCardDetails
                            openMNKDetails={openMNKDetails}
                            setOpenMNKDetails={setOpenMNKDetails}
                            setOpenGroup={setOpenGroup}
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">
                            No group selected
                        </div>
                    )}
                </div>
            </div>

            {/* Create MNK Modal */}
            {openMNK && (
                <CreateMNKModal
                    mnkName={mnkName}
                    setMnkName={setMnkName}
                    setOpenMNK={setOpenMNK}
                    handleCreateMNK={handleCreateMNK}
                />
            )}

            {/* Add Users Modal */}
            {openGroup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <GroupCard
                        setOpenGroup={setOpenGroup}
                        openGroup={openGroup}
                        mnkUsers={mnkUsers}
                    />
                </div>
            )}
        </div>
    );
}
