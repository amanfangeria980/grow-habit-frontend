import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import "@/styles/animations.css";

async function UserHomePage() {
    const auth = await getSession();
    console.log("The value of the user from the backend is ", auth?.user) ; 
    // const name = auth?.user?.name?.split(" ")[0].toLowerCase();
    const userId = auth?.user?.id ; 
    if (!auth?.user) {
        redirect("/login");
    }

    const today = new Date().getDate();

    // Fetch user data server-side
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/user-graph/${userId}`,
        { cache: "no-store" }
    );
    const data = await response.json();
    const recordsArray = data.success ? data.data : [];
    // console.log("This is the value of records array ", recordsArray)

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="text-center mb-4">
                <h1 className="text-xl font-semibold">Hi, {auth.user.name}</h1>
                <p className="text-gray-600 mt-2">
                    Your two-pointer status for today is:
                </p>
            </div>

            <div className="grid grid-cols-5 gap-4 justify-center max-w-3xl mx-auto">
                {JSON.stringify(recordsArray)}
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
