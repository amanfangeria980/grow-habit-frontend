import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GroupCardProps {
    setOpenGroup: (group: any) => void;
    openGroup: any;
    mnkUsers: any[];
}

export function GroupCard({
    setOpenGroup,
    openGroup,
    mnkUsers,
}: GroupCardProps) {
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
