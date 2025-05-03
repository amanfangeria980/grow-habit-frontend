"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle>Create New MNK Group</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input
                                value={mnkName}
                                onChange={(e) => setMnkName(e.target.value)}
                                placeholder="Enter group name"
                                className="w-full"
                            />
                            <div className="flex justify-end gap-3">
                                <Button
                                    onClick={() => setOpenMNK(false)}
                                    variant="outline"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleCreateMNK}
                                    className="bg-blue-600 hover:bg-blue-700"
                                    disabled={!mnkName.trim()}
                                >
                                    Create Group
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
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

function GroupCard({
    setOpenGroup,
    openGroup,
    mnkUsers,
}: {
    setOpenGroup: any;
    openGroup: any;
    mnkUsers: any;
}) {
    const addToMNK = async (
        userId: string,
        mnkId: string,
        userName: string
    ) => {
        if (
            !window.confirm(
                `Are you sure you want to add ${userName} to ${openGroup.name}?`
            )
        ) {
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/add-to-mnk`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId, mnkId }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const repData = await response.json();

            if (repData.success) {
                setOpenGroup(null);
                window.location.reload();
            } else {
                console.error("Failed to add user to MNK:", repData.message);
                alert("Failed to add user to MNK: " + repData.message);
            }
        } catch (error) {
            console.error("Error adding user to MNK:", error);
            alert("Error adding user to MNK. Please try again.");
        }
    };

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="text-xl">
                    Add Users to {openGroup.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="max-h-[60vh] overflow-y-auto pr-2">
                    {mnkUsers.length > 0 ? (
                        <div className="space-y-2">
                            {mnkUsers.map((user: any) => (
                                <Card
                                    key={user.id}
                                    className="p-3 hover:bg-gray-50"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-medium">
                                                {user.fullName}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {user.email}
                                            </p>
                                        </div>
                                        <Button
                                            onClick={() =>
                                                addToMNK(
                                                    user.id,
                                                    openGroup.id,
                                                    user.fullName
                                                )
                                            }
                                            size="sm"
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            Add User
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6 text-gray-500">
                            No eligible users available
                        </div>
                    )}
                </div>
                <div className="flex justify-end pt-4">
                    <Button
                        onClick={() => setOpenGroup(null)}
                        variant="outline"
                    >
                        Close
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

function GroupCardDetails({
    openMNKDetails,
    setOpenMNKDetails,
    setOpenGroup,
}: {
    openMNKDetails: any;
    setOpenMNKDetails: any;
    setOpenGroup: any;
}) {
    const users = openMNKDetails.users;

    const removeMNK = async (
        userId: string,
        mnkId: string,
        userName: string
    ) => {
        if (
            !window.confirm(
                `Are you sure you want to remove ${userName} from ${openMNKDetails.name}?`
            )
        ) {
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/remove-from-mnk`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId, mnkId }),
                }
            );
            const data = await response.json();

            if (response.ok) {
                window.location.reload();
            } else {
                console.error("Failed to remove user from MNK:", data.message);
                alert("Failed to remove user from MNK: " + data.message);
            }
        } catch (error) {
            console.error("Error removing user from MNK:", error);
            alert("Error removing user from MNK. Please try again.");
        }
    };

    const deleteMNKGroup = async (mnkId: string) => {
        if (
            !window.confirm(
                `Are you sure you want to delete ${openMNKDetails.name}? This action cannot be undone.`
            )
        ) {
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/delete-mnk-group`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ mnkId }),
                }
            );
            const data = await response.json();

            if (response.ok) {
                setOpenMNKDetails(null);
                window.location.reload();
            } else {
                console.error("Failed to delete MNK group:", data.message);
                alert("Failed to delete MNK group: " + data.message);
            }
        } catch (error) {
            console.error("Error deleting MNK group:", error);
            alert("Error deleting MNK group. Please try again.");
        }
    };

    return (
        <div className="space-y-6">
            <Card className="shadow-lg">
                <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">
                            {openMNKDetails.name}
                        </CardTitle>
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={() => setOpenGroup(openMNKDetails)}
                            >
                                Add Members
                            </Button>
                            <Button
                                size="sm"
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() =>
                                    deleteMNKGroup(openMNKDetails.id)
                                }
                            >
                                Delete Group
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Members</h3>
                            <span className="text-sm text-gray-500">
                                Total: {users?.length || 0}
                            </span>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto pr-2">
                            {users && users.length > 0 ? (
                                <div className="space-y-2">
                                    {users.map((user: any) => (
                                        <Card
                                            key={user.userId}
                                            className="p-3 hover:bg-gray-50"
                                        >
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-medium">
                                                    {user.name}
                                                </h3>
                                                <Button
                                                    className="bg-red-500 hover:bg-red-600"
                                                    size="sm"
                                                    onClick={() =>
                                                        removeMNK(
                                                            user.userId,
                                                            openMNKDetails.id,
                                                            user.name
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 text-gray-500">
                                    No members in this group yet
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
