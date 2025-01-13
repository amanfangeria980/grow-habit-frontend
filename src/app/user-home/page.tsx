


export default function UserHome() {
    const recordsArray = [
        { value: "yes", day: 1 },
        { value: "no", day: 2 },
        { value: "yes", day: 3 },
        { value: "no", day: 4 },
        { value: "yes", day: 5 },
        { value: "no", day: 6 },
        { value: "yes", day: 7 },
        { value: "no", day: 8 },
        { value: "yes", day: 9 },
        { value: "no", day: 10 },
        { value: "yes", day: 11 },
        { value: "no", day: 12 },
        { value: "yes", day: 13 },
        { value: "no", day: 14 },
        { value: "yes", day: 15 },
        { value: "no", day: 16 },
        { value: "yes", day: 17 },
        { value: "no", day: 18 },
        { value: "yes", day: 19 },
        { value: "no", day: 20 },
        { value: "yes", day: 21 },
        { value: "no", day: 22 },
        { value: "yes", day: 23 },
        { value: "no", day: 24 },
        { value: "yes", day: 25 }
    ];
    return (
        <>
            <div className="p-4 bg-gray-100 min-h-screen">
                <div className="text-center mb-4">
                    <h1 className="text-xl font-semibold">Hi, Parth</h1>
                    <p className="text-gray-600 mt-2">Your two-pointer status for today is:</p>
                </div>

                <div className="grid grid-cols-7 gap-[0.1px] justify-center">
                    {recordsArray.map((item) => (
                        <div key={item.day} className="flex flex-col items-center">
                            <div
                                className={`w-5 h-5 ${
                                    item.value === "yes"
                                        ? "bg-green-300 border-green-400"
                                        : "bg-red-300 border-red-400"
                                } border-2`}
                            ></div>
                            <p className="mt-2 text-sm font-medium text-gray-700">Day {item.day}</p>
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
        </>
    );
}
