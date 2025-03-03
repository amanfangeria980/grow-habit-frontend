"use client";
import { useRouter } from "next/navigation";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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
              if (item.value === "undefined" && item.day <= today) {
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

export function NoHabitComp({
  userDetails,
  auth,
}: {
  userDetails: any;
  auth: any;
}) {
  const [habitFlag, setHabitFlag] = useState<boolean>(false);



  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col gap-6">
      {/* Create Habit Section */}
      <div className="text-center font-bold text-xl">
        Hello , {auth.user.name}
      </div>
      <Card className="p-4 flex justify-between items-center shadow-md">
        <p className="text-lg font-semibold">Create your first habit</p>
        <Button
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
          onClick={() => {
            setHabitFlag(true);
          }}
        >
          Create Habit
        </Button>

        {habitFlag && (
          <CreateHabitComp habitFlag={habitFlag} setHabitFlag={setHabitFlag} auth={auth} />
        )}
      </Card>

      {/* Pointers Section */}
      <Card className="p-4 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">
            Pointers to Create Your Habit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              You are not looking for quick fixes
            </li>
            <li className="flex items-center gap-2">
              Make habits that you want to keep for a lifetime
            </li>
            <li className="flex items-center gap-2">
              Start small and stay consistent
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function CreateHabitComp({
  habitFlag,
  setHabitFlag, auth
}: {
  habitFlag: boolean;
  setHabitFlag: React.Dispatch<React.SetStateAction<boolean>>;
  auth : any
}) {

    const initialState = {
      name : "", 
      gateway : "", 
      plus : "", 
      elite : "", 
      cue : "", 
      importance : ""
    }

    const [habitDetails, setHabitDetails] = useState(initialState)

    const handleCreateHabit = async()=>{

      try{

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/create-habit`, {method : "POST", headers : {'Content-Type' : 'application/json'}, body : JSON.stringify({userId : auth.user.id, habitDetails : habitDetails})})
      const repData = await response.json() ; 
      console.log("this is the value of repData ", repData) ; 
      setHabitFlag(false) ; 
    }
    catch(error : any)
    {
      console.log("error", error.message) ; 
    }

    }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96 relative">
      {JSON.stringify(habitDetails)}
        <h2 className="text-xl font-semibold text-center">
          Create a New Habit
        </h2>

        {/* Close Button */}

        {/* Habit Name Input */}
        <Input
          type="text"
          placeholder="Habit Name"
          className="mt-4 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={habitDetails.name} onChange={(e : any)=>{setHabitDetails({...habitDetails, name : e.target.value})}}
        />

        {/* Save Button */}

        <Input
          type="text"
          placeholder="Your Cue "
          className="mt-4 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={habitDetails.cue} onChange={(e : any)=>{setHabitDetails({...habitDetails, cue : e.target.value})}}
        />

        <Input
          type="text"
          placeholder="Gateway Habit Statement"
          className="mt-4 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={habitDetails.gateway} onChange={(e: any)=>{setHabitDetails({...habitDetails, gateway : e.target.value})}}
        />

        <Input
          type="text"
          placeholder="Plus Habit Statement"
          className="mt-4 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={habitDetails.plus} onChange={(e: any)=>{setHabitDetails({...habitDetails, plus : e.target.value})}}
        />

        <Input
          type="text"
          placeholder="Elite Habit Statement"
          className="mt-4 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={habitDetails.elite} onChange={(e: any)=>{setHabitDetails({...habitDetails, elite : e.target.value})}}
        />

        <Input
          type="text"
          placeholder="Why this habit is important to you ?"
          className="mt-4 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={habitDetails.importance} onChange={(e: any)=>{setHabitDetails({...habitDetails, importance : e.target.value})}}
        />

        <div className="flex gap-2 justify-center mt-3">
          <Button onClick={() => handleCreateHabit()} className="">
            Save Habit
          </Button>

          <Button onClick={() => setHabitFlag(false)} className="">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
