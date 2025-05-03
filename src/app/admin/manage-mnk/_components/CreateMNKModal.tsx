import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface CreateMNKModalProps {
    mnkName: string;
    setMnkName: (name: string) => void;
    setOpenMNK: (open: boolean) => void;
    handleCreateMNK: () => Promise<void>;
}

export function CreateMNKModal({
    mnkName,
    setMnkName,
    setOpenMNK,
    handleCreateMNK,
}: CreateMNKModalProps) {
    return (
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
    );
}
