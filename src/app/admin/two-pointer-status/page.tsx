// Steps to perform :
// 1. find today's date
// 2. Pull the data of the past two days
// 3. Use logic .ts to create the two pointer status

// Next action => Check Status
"use client";

import { useState } from "react";
const Page = () => {
    const [day, setDay] = useState<string>("");
    const [finStatus, setFinStatus] = useState<any>([]);

    const fetchTwoPointerStatus = async () => {
        const sendData = {
            username: "parth",
            day: parseInt(day, 10),
        };
        const response = await fetch(
            "http://localhost:5173/get-two-pointer-status",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sendData),
            }
        );
        const repData = await response.json();
        console.log("The message from the backend ", repData);
        const results = repData.results;
        if (results) {
            const { dayYesterday, dayBeforeYesterday } = repData.data;

            console.log("The value of dayYesterday is ", dayYesterday);
            console.log("aman");
            console.log(
                "The value of dayBeforeYesterday is ",
                dayBeforeYesterday
            );

            const checkStatus = (
                dayYesterday: String,
                dayBeforeYesterday: String
            ) => {
                let status = "";

                if (
                    dayYesterday === "gateway" &&
                    dayBeforeYesterday === "gateway"
                ) {
                    status = "duck";
                } else if (
                    dayYesterday === "gateway" &&
                    dayBeforeYesterday === "no"
                ) {
                    status = "duck";
                } else if (
                    dayYesterday === "no" &&
                    dayBeforeYesterday === "gateway"
                ) {
                    status = "crab";
                } else if (
                    dayYesterday === "no" &&
                    dayBeforeYesterday === "no"
                ) {
                    status = "cross";
                }

                return status;
            };

            const status = checkStatus(dayYesterday, dayBeforeYesterday);

            let pushValue = {
                username: "parth",
                status: status,
            };

            setFinStatus((prevFinStatus) => [...prevFinStatus, pushValue]);
        } else {
            console.log(repData.message);
        }
    };
    return (
        <>
            <div>This is the admin page for generating 2 pointer status </div>
            <div>
                <h2>Date : </h2>
            </div>
            {day}

            <div>
                <input
                    type="number"
                    className="border-2 border-black bg-gray"
                    min={1}
                    max={25}
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                />
                <button
                    onClick={fetchTwoPointerStatus}
                    className="border-2 border-black bg-gray-200 disabled:bg-red-400"
                    disabled={!day || isNaN(parseInt(day, 10))}
                >
                    Generate two pointer status{" "}
                </button>
            </div>

            <div>
                <h2>This is the finstatus</h2>
                {JSON.stringify(finStatus)}
            </div>
        </>
    );
};

export default Page;