"use client";
import { Divide } from "lucide-react";
import { useEffect, useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


import { fetchSecondaryHabitReflection } from "@/utils/functions";
import EditCustomReflection from "./EditCustomReflection";

export default function ShowCustomReflection({ userId }: { userId: string }) {
  const [userDetails, setUserDetails] = useState<any>({});
  const [isSecondaryHabit, setIsSecondaryHabit] = useState<boolean | undefined>(
    undefined
  );
  const [secondaryHabitReflection, setSecondaryHabitReflection] = useState<any>(
    {}
  );
  const [chartData, setChartData] = useState<any[]>([]);
  const [secondaryHabitDetails, setSecondaryHabitDetails] = useState<any>({});
  const [idealValue, setIdealValue] = useState<any>([]);
  const [realValue, setRealValue] = useState<any>([]);

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-user-details/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setUserDetails(data.data);
      let detailsUser = data.data;
      if (detailsUser?.secondaryHabit?.length > 0) {
        setIsSecondaryHabit(true);
      } else {
        setIsSecondaryHabit(false);
      }
      console.log("the user details are", data.data);
    };

    getUserDetails();
  }, []);

  useEffect(() => {
    if (isSecondaryHabit) {
      console.log("i was here inside the isSecondaryHabit");


      const fetchSecondaryHabitDetails = async () => {
        try{
          console.log("the secondary habit id is", userDetails?.secondaryHabit[0]);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/custom-value/${userDetails?.secondaryHabit[0]}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          const repData = await response.json();
          const habitData = repData?.data?.secondaryHabit;
          const tempIdealValue = Object.values(habitData?.ideal);
          const formattedIdealValue = tempIdealValue.map((value: any, index: number) => ({
            day: index + 1,
            value: Number(value)
          }));
          setIdealValue(formattedIdealValue);
            setSecondaryHabitDetails(repData?.data?.secondaryHabit);
            
        }
        catch(error){
          console.log("the error in fetching secondary habit details", error);
        }
      }

      fetchSecondaryHabitDetails();

      fetchSecondaryHabitReflection({userDetails, setSecondaryHabitReflection, setRealValue});
    }
  }, [isSecondaryHabit]);

  useEffect(() => {
      if(idealValue.length > 0 && realValue.length > 0){
        const chartData = idealValue.map((item: any, index: number) => ({
          day: index + 1,
          value: realValue[index]?.value,
          ideal: item.value
        }));
        setChartData(chartData);
      }
  }, [idealValue, realValue]);

  if (!isSecondaryHabit) {
    return (
      <div>
        <h1>There is no data to show and is there is no secondary habit</h1>
      </div>
    );
  }

  return (
    <>
      {chartData && (
        <>
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <ComposedChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Actual Value" />
              <Line
                type="monotone"
                dataKey="ideal"
                stroke="#ff0000"
                strokeWidth={2}
                dot={{ fill: "#ff0000", r: 4 }}
                name="Ideal Target"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <EditCustomReflection
          secondaryHabitDetails={secondaryHabitDetails}
          setSecondaryHabitDetails={setSecondaryHabitDetails}
          secondarHabitReflection={secondaryHabitReflection}
          setSecondaryHabitReflection={setSecondaryHabitReflection}
        />
        </>
      )}
    </>
  );
}
