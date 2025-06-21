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

export default function ShowCustomReflection({ userId }: { userId: string }) {
  const [userDetails, setUserDetails] = useState<any>({});
  const [isSecondaryHabit, setIsSecondaryHabit] = useState<boolean | undefined>(
    undefined
  );
  const [secondaryHabitReflection, setSecondaryHabitReflection] = useState<any>(
    {}
  );
  const [chartData, setChartData] = useState<any[]>([]);

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
      const fetchSecondaryHabit = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-custom-value-reflection/${userDetails?.secondaryHabit[0]}`
        );

        const repData = await response.json();
        console.log("the response is", repData);
        const habitData = repData.data;
        setSecondaryHabitReflection(repData.data);

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

      fetchSecondaryHabit();
    }
  }, [isSecondaryHabit]);

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
      )}
    </>
  );
}
