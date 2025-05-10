"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function CustomReflection({ userId }: { userId: string }) {
  const [customNumber, setCustomNumber] = useState({
    name: "",
    value: 0,
    unit: "",
  });

  const [userDetails, setUserDetails] = useState<any>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/add-custom-value`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, ...customNumber }),
        }
      );

      const data = await response.json();
      console.log("value of the response is", data);
    } catch (error) {
      console.error("Error adding custom value:", error);
    }
  };

  const handleDelete = async () => {
    console.log("the user details are", userDetails);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/delete-custom-value`, {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({userId, customId : userDetails.secondaryHabit[0]})
    })

    const data = await response.json();
    console.log("value of the response is", data);
  };

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
      console.log("the user details are", data.data);
    };

    getUserDetails();
  }, []);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
          // Handle form submission here
        }}
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Add custom value name"
            value={customNumber.name}
            onChange={(e) =>
              setCustomNumber({ ...customNumber, name: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Add initial value"
            value={customNumber.value}
            onChange={(e) =>
              setCustomNumber({
                ...customNumber,
                value: e.target.value === "" ? 0 : parseInt(e.target.value),
              })
            }
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Add the unit"
            value={customNumber.unit}
            onChange={(e) =>
              setCustomNumber({ ...customNumber, unit: e.target.value })
            }
            className="p-2 border rounded"
          />

          <Button type="submit">Add a custom number</Button>
        </div>
      </form>
      <Button onClick={handleDelete} className="my-2">
        Delete the custom number
      </Button>
    </div>
  );
}
