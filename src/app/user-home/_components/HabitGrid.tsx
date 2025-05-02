"use client";
import { useRouter } from "next/navigation";
interface HabitGridProps {
    recordsArray: Array<{ value: string; day: number }>;
    today: number;
}

export function HabitGrid({ recordsArray, today }: HabitGridProps) {
    const router = useRouter();

    return (
        <div className="grid grid-cols-5 gap-4 justify-center max-w-3xl mx-auto">
            {recordsArray.map((item) => (
                <div key={item.day} className="flex flex-col items-center p-2">
                    <div
                        onClick={() => {
                            if (
                                item.value === "undefined" &&
                                item.day <= today
                            ) {
                                router.push("/reflection-form");
                            }
                        }}
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
                                : "bg-red-300 border-red-400 hover:scale-110"
                        } border-2`}
                    ></div>
                    <p className="mt-2 text-xs font-medium text-gray-700">
                        Day {item.day}
                    </p>
                </div>
            ))}
        </div>
    );
}
