import { signIn } from "next-auth/react";
import { RegisterFormData, SignInFormData } from "./types";

export const registerUser = async (data: RegisterFormData) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    const responseData = await response.json();
    return responseData;
};


export const fetchSecondaryHabitReflection = async ({userDetails, setSecondaryHabitReflection, setChartData}: {userDetails: any, setSecondaryHabitReflection: React.Dispatch<React.SetStateAction<any>>, setChartData: React.Dispatch<React.SetStateAction<any>>}) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-custom-value-reflection/${userDetails?.secondaryHabit[0]}`
    );

    const repData = await response.json();
    console.log("the response is", repData);
    const habitData = repData.data;
    setSecondaryHabitReflection(repData.data);

    if(!habitData){
        console.log("the habit data is not found"   );
        return;
    }

    const chartData = habitData.map((item: any) => ({
      day: item.testDay,
      value: item.customNumber,
    }));

    const tempChartData = {
      1: {
        day: 1,
        value: 3,
      },
      2: {
        day: 2,
        value: 5,
      },
      3: {
        day: 3,
        value: 4,
      },
      4: {
        day: 4,
        value: 6,
      },
      5: {
        day: 5,
        value: 3,
      },
      6: {
        day: 6,
        value: 7,
      },
      7: {
        day: 7,
        value: 5,
      },
      8: {
        day: 8,
        value: 4,
      },
      9: {
        day: 9,
        value: 6,
      },
      10: {
        day: 10,
        value: 5,
      },
    };

    const idealTargets = {
      1: 4.8,
      2: 4.8,
      3: 4.8,
      4: 4.8,
      5: 4.8,
      6: 4.8,
      7: 4.8,
      8: 4.8,
      9: 4.8,
      10: 4.8,
      11: 4.8,
      12: 4.8,
      13: 4.8,
      14: 4.8,
      15: 4.8,
      16: 4.8,
      17: 4.8,
      18: 4.8,
      19: 4.8,
      20: 4.8,
      21: 4.8,
      22: 4.8,
      23: 4.8,
      24: 4.8,
      25: 4.8,
    };

    const idealChartData = Object.values(chartData).map((item: any) => ({
        day: item.day,
        value: item.value,
        ideal: idealTargets[item.day] || 5 // Default to 5 if no specific target
      }));

    setChartData(idealChartData);

    console.log("the chart data is", chartData);
  };
