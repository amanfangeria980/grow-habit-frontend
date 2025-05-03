import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface MNKJoinRequestsProps {
    mnkId: string;
    mnkName: string;
}

interface JoinRequest {
    id: string;
    userId: string;
    name: string;
    groupName: string;
    status: "pending" | "approved" | "rejected";
    createdAt: string;
}

export function MNKJoinRequests({ mnkId, mnkName }: MNKJoinRequestsProps) {
    const [requests, setRequests] = useState<JoinRequest[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchJoinRequests = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/mnk-join-requests/${mnkId}`
            );
            const data = await response.json();
            if (data.success) {
                setRequests(data.requests);
            } else {
                console.error("Failed to fetch join requests:", data.message);
            }
        } catch (error) {
            console.error("Error fetching join requests:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRequest = async (
        requestId: string,
        userId: string,
        action: "approve" | "reject"
    ) => {
        if (
            !window.confirm(`Are you sure you want to ${action} this request?`)
        ) {
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/mnk-join-request/handle`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ requestId, userId, mnkId, action }),
                }
            );
            const data = await response.json();

            if (data.success) {
                // Refresh the requests list
                fetchJoinRequests();
                window.location.reload();
            } else {
                console.error(`Failed to ${action} request:`, data.message);
                alert(`Failed to ${action} request: ${data.message}`);
            }
        } catch (error) {
            console.error(`Error ${action}ing request:`, error);
            alert(`Error ${action}ing request. Please try again.`);
        }
    };

    useEffect(() => {
        if (mnkId) {
            fetchJoinRequests();
        }
    }, [mnkId]);

    return (
        <Card className="shadow-lg">
            <CardHeader className="border-b">
                <CardTitle className="text-xl">
                    Join Requests for {mnkName}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">
                            Pending Requests
                        </h3>
                        <span className="text-sm text-gray-500">
                            Total:{" "}
                            {
                                requests.filter((r) => r.status === "pending")
                                    .length
                            }
                        </span>
                    </div>
                    <div className="max-h-[40vh] overflow-y-auto pr-2">
                        {loading ? (
                            <div className="text-center py-6 text-gray-500">
                                Loading requests...
                            </div>
                        ) : requests.filter((r) => r.status === "pending")
                              .length > 0 ? (
                            <div className="space-y-2">
                                {requests
                                    .filter(
                                        (request) =>
                                            request.status === "pending"
                                    )
                                    .map((request) => (
                                        <Card
                                            key={request.id}
                                            className="p-3 hover:bg-gray-50"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium">
                                                        {request.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-400">
                                                        Requested:{" "}
                                                        {new Date(
                                                            request.createdAt
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            Actions{" "}
                                                            <ChevronDown className="ml-2 h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleRequest(
                                                                    request.id,
                                                                    request.userId,
                                                                    "approve"
                                                                )
                                                            }
                                                            className="text-green-600"
                                                        >
                                                            Approve
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleRequest(
                                                                    request.id,
                                                                    request.userId,
                                                                    "reject"
                                                                )
                                                            }
                                                            className="text-red-600"
                                                        >
                                                            Reject
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </Card>
                                    ))}
                            </div>
                        ) : (
                            <div className="text-center py-6 text-gray-500">
                                No pending join requests
                            </div>
                        )}
                    </div>

                    {/* Recent Activity Section */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">
                            Recent Activity
                        </h3>
                        <div className="space-y-2">
                            {requests
                                .filter(
                                    (request) => request.status !== "pending"
                                )
                                .slice(0, 5) // Show only last 5 activities
                                .map((request) => (
                                    <div
                                        key={request.id}
                                        className="flex items-center justify-between p-2 text-sm"
                                    >
                                        <div>
                                            <span className="font-medium">
                                                {request.name}
                                            </span>
                                            <span className="text-gray-500">
                                                {" "}
                                                - Request{" "}
                                                <span
                                                    className={
                                                        request.status ===
                                                        "approved"
                                                            ? "text-green-600"
                                                            : "text-red-500"
                                                    }
                                                >
                                                    {request.status}
                                                </span>
                                            </span>
                                        </div>
                                        <span className="text-gray-400">
                                            {new Date(
                                                request.createdAt
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
