import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GroupCardDetailsProps {
    openMNKDetails: any;
    setOpenMNKDetails: (details: any) => void;
    setOpenGroup: (group: any) => void;
}

export function GroupCardDetails({
    openMNKDetails,
    setOpenMNKDetails,
    setOpenGroup,
}: GroupCardDetailsProps) {
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
