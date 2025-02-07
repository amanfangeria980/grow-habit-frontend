import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import "@/styles/animations.css";
import { Card } from "@/components/ui/card";

async function UserHomePage() {
    const auth = await getSession();
    const name = auth?.user?.name?.split(" ")[0].toLowerCase();
    if (!auth?.user) {
        redirect("/login");
    }

    const today = new Date().getDate();

    // Fetch user data server-side
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/user-graph/${name}`,
        { cache: "no-store" }
    );
    const data = await response.json();
    const recordsArray = data.success ? data.data : [];
    const dataMatrix: Record<string, { commitment: string }> = {};
    let reflectionRate: any = "";
    let uniDays: any = [];

    if (data.success) {
        const today = new Date().getDate();

        uniDays = Array.from(new Set(recordsArray.map((r: any) => r.day))).sort(
            (a: any, b: any) => a - b
        );

        recordsArray.map((ref: any) => {
            if (ref.day < today) {
                dataMatrix[ref.day] = { commitment: ref.value };
            }
        });

        let reflectionScore = 0;

        uniDays.map((day: any) => {
            if (day < today) {
                if (
                    dataMatrix[day].commitment === "gateway" ||
                    dataMatrix[day].commitment === "no" ||
                    dataMatrix[day].commitment === "plus" ||
                    dataMatrix[day].commitment === "elite"
                ) {
                    reflectionScore++;
                }
            }
        });

        reflectionRate = (reflectionScore / (today - 1)) * 100;
        console.log("This is the value of reflectionScore ", reflectionScore);
        console.log("This is the value of reflection rate ", reflectionRate);
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="text-center mb-4">
                <h1 className="text-xl font-semibold">Hi, {auth.user.name}</h1>

                <div className="flex gap-2 justify-center mt-2">
                    <Card className="p-2 ">
                        Your reflection rate is :{" "}
                        <b> {`${reflectionRate}%` || ""} </b>
                    </Card>
                    {/* <Card className="p-2">
                        Your CoC score is : <b></b>
                    </Card> */}
                </div>
            </div>
            {/* <div>
                This is the valeu of recordsArray
                {
                    JSON.stringify(recordsArray)
                }
            </div>
            <div>
                <h2>This is the value of dataMatrix</h2>
                {
                    JSON.stringify(dataMatrix)
                }
            </div>
            <div>
                <h2>This is the value of uniDays </h2>
                {
                    JSON.stringify(uniDays)
                }
            </div> */}

            <div className="grid grid-cols-5 gap-4 justify-center max-w-3xl mx-auto">
                {recordsArray.map((item: { value: string; day: number }) => (
                    <div
                        key={item.day}
                        className="flex flex-col items-center p-2"
                    >
                        <div
                            className={`w-8 h-8 rounded-md ${
                                item.day >= today
                                    ? "bg-slate-200 border-slate-300"
                                    : item.value === "no"
                                    ? "bg-black border-slate-300"
                                    : item.value === "gateway"
                                    ? "bg-yellow-300 border-yellow-400"
                                    : item.value === "plus"
                                    ? "bg-green-300 border-green-400"
                                    : item.value === "elite"
                                    ? "bg-green-600 border-green-700"
                                    : "bg-red-300 border-red-400 blink"
                            } border-2`}
                        ></div>
                        <p className="mt-2 text-xs font-medium text-gray-700">
                            Day {item.day}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-10">
                <h2>Weekly Score card : 1 - 7 </h2>
                <div>
                    <h2>Level 1 : Check/ uncheck </h2>
                    <p>Reflection Score : </p>
                    <p>Gateway Score : </p>
                </div>
                <div>
                    <h2>Level 2 : Check / Uncheck </h2>
                    <p> Cue Rate : </p>
                    <p>Plus Score : </p>
                </div>
                <div>
                    <h2>Level 3 : Check / Uncheck</h2>
                    <p>Frequent connection with commrade pair </p>
                    <p> Constantly Updating your plus statement </p>
                </div>
            </div>
        </div>
    );
}

export default UserHomePage;
