"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import VerticalNavbar from "@/components/VerticalNavbar";
import Image from "next/image";
import growHabitLogo from "@/assets/grow-habit-logo.png"

// To do : define the interface reflections
interface Reflections {}

export default function Page() {
  const [reflections, setReflections] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editFlag, setEditFlag] = useState<String | null>(null);
  const [editDayValue, setEditDayValue] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [errorFlag, setErrorFlag] = useState<string | null>(null);

  const updateReflections = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-reflections`
    );
    const repData = await response.json();
    console.log("This is what I fetched from the backend ", repData);
    setReflections(repData.data);
  };

  const handleEdit = (ref: any) => {
    setEditDayValue(ref.testDay);
    setEditFlag(ref.id);
  };

  const handleSave = async (ref: any) => {
    setEditFlag(null);
    if (typeof editDayValue === "string") {
      const trimmedValue = editDayValue.trim().replace(/\s+/g, " ");
      const value = Number(trimmedValue);

      const sendData = {
        updatedDay: value,
        reflectionData: ref,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/update-reflection`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sendData),
        }
      );
      const repData = await response.json();

      console.log("The data from the backend is ", repData);

      if (!repData.success) {
        setErrorFlag(repData.message);
      }
    }
  };

  const handleDelete = async (ref: any) => {
    console.log("This is the value of ref from delete button ", ref);

    const sendData = {
      data: ref,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/delete-reflection`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      }
    );
    const repData = await response.json();
    console.log(
      "The data from the backend ( delete-reflections ) is ",
      repData
    );
  };

  useEffect(() => {
    const useFunction = async () => {
      await updateReflections();
    };

    useFunction();
  }, []);

  useEffect(() => {
    console.log(reflections);
  }, [reflections]);

  useEffect(() => {});

  const TdComp = ({
    children,
    classname,
  }: {
    children: any;
    classname?: string;
  }) => {
    return (
      <td className={clsx("border-2 border-black px-2", classname)}>
        {children}
      </td>
    );
  };

  return (
    <>
    <div className="flex gap-2">

    
      <div className="min-h-screen bg-black text-white">
        <div className="flex flex-col justify-between h-[80%] sticky top-0 py-5 px-2
         ">

            <div>
                <Image width={100} height={100}  src={growHabitLogo} className="rounded-full" alt="kuch toh likhna hi than" />
            </div>

            <div>
                Two pointer status 
            </div>

            <div>
                Form Reflections 
            </div>
            <div>
                Habit - Dashboard 
            </div>

        </div>
      </div>
      <div>
        <div>This is the form reflections page </div>
        {editFlag ? editFlag : "there is no value"}

        <div>
          <table className="border-2 border-black">
            <thead>
              <tr>
                <th className="border-2 border-black px-2"> Timestamp </th>
                <th className="border-2 border-black px-2">Name</th>
                <th className="border-2 border-black px-2">day</th>
                <th className="border-2 border-black px-2">commitment</th>
                <th className="border-2 border-black px-2 ">testDay</th>
                <th className="border-2 border-black px-2 ">Delete</th>
                <th className="border-2 border-black px-2 ">Edit</th>
              </tr>
            </thead>

            <tbody>
              {reflections.map((ref: any) => {
                return (
                  <tr key={ref.id}>
                    <TdComp>{ref.timestamp}</TdComp>
                    <TdComp>{ref.name}</TdComp>
                    <TdComp>{ref.day}</TdComp>
                    <TdComp>{ref.commitment}</TdComp>
                    <TdComp classname="">
                      {editFlag === ref.id ? (
                        <div>
                          <input
                            type="text"
                            className="px-2 border-2 border-black rounded-md"
                            value={editDayValue}
                            onChange={(e) => {
                              setEditDayValue(e.target.value);
                            }}
                          />
                        </div>
                      ) : (
                        ref.testDay
                      )}
                    </TdComp>

                    <TdComp classname="">
                      <button
                        className="bg-black text-white rounded-md m-1 p-1"
                        onClick={() => {
                          handleDelete(ref);
                        }}
                      >
                        Delete
                      </button>
                    </TdComp>
                    <TdComp classname="">
                      {" "}
                      {editFlag === ref.id ? (
                        <button
                          className="bg-black text-white rounded-md m-1 p-1 px-2"
                          onClick={() => {
                            handleSave(ref);
                          }}
                        >
                          {" "}
                          Save{" "}
                        </button>
                      ) : (
                        <button
                          className="bg-black text-white rounded-md m-1 p-1 px-2"
                          onClick={() => {
                            handleEdit(ref);
                          }}
                        >
                          Edit
                        </button>
                      )}{" "}
                    </TdComp>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {errorFlag && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-md shadow-lg p-6 text-center flex flex-col gap-2">
              <h2 className="text-red-600 font-semibold">Error</h2>
              {errorFlag}
              <button
                className="p-2 bg-black rounded-md text-white"
                onClick={() => {
                  setErrorFlag(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      </div>
    </>
  );
}
