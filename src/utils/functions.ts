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


export const fetchSecondaryHabitReflection = async ({userDetails, setSecondaryHabitReflection, setRealValue}: {userDetails: any, setSecondaryHabitReflection: React.Dispatch<React.SetStateAction<any>>,setRealValue: React.Dispatch<React.SetStateAction<any>>}) => {
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

    const realValue = habitData.map((item: any) => ({
      day: item.testDay,
      value: item.customNumber,
    }));


    setRealValue(realValue);

  };
