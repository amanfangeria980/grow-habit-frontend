"use client";
import { useState, useEffect } from "react";

interface EditCustomReflectionProps {
  secondaryHabitDetails: any;
  setSecondaryHabitDetails: React.Dispatch<React.SetStateAction<any>>;
  secondarHabitReflection: any;
  setSecondaryHabitReflection: React.Dispatch<React.SetStateAction<any>>;
}

export default function EditCustomReflection({
  secondaryHabitDetails,
  setSecondaryHabitDetails,
  secondarHabitReflection,
  setSecondaryHabitReflection,
}: EditCustomReflectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [idealValue, setIdealValue] = useState<string[]>([]);
  const [actualValue, setActualValue] = useState<Record<number, string>>({});

  useEffect(() => {


    if (secondaryHabitDetails?.ideal) {
      const idealValues = Object.values(secondaryHabitDetails?.ideal).map(
        String
      );
      setIdealValue(idealValues);
    }

    if (secondarHabitReflection && Array.isArray(secondarHabitReflection)) {
      const realValues = secondarHabitReflection.reduce((acc, item) => {
        if (
          item &&
          typeof item === "object" &&
          "testDay" in item &&
          "customNumber" in item
        ) {
          acc[item.testDay] = String(item.customNumber);
        }
        return acc;
      }, {} as Record<number, string>);
      setActualValue(realValues);
    }
  }, [secondaryHabitDetails, secondarHabitReflection]);

  const handleIdealValueChange = (index: number, value: string) => {
    setIdealValue((prev) => {
      const newValues = [...prev];
      newValues[index] = value;
      return newValues;
    });
  };

  const handleActualValueChange = (day: number, value: string) => {
    setActualValue((prev) => ({
      ...prev,
      [day]: value,
    }));
  };

  const handleSave = ()=> { 

    setIsEditing(false);
  }

 


  //   if(secondarHabitReflection){
  //     realValue = Object.values(secondarHabitReflection);
  //     console.log("the real value are", realValue);
  //   }
  //   else{
  //     console.log("the real value are not found");
  //   }

  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];

  //   if (secondaryHabitDetails?.ideal) {
  //     idealValues = Object.values(secondaryHabitDetails?.ideal);
  //     console.log("the ideal values are", idealValues);
  //   } else {
  //     console.log("the ideal values are not found");
  //   }

  //   if (secondarHabitReflection) {
  //     realValue = Object.values(secondarHabitReflection);
  //     console.log("the real value are", realValue);
  //   } else {
  //     console.log("the real value are not found");
  //   }

  return (
    <div className="w-full px-2 py-1 border border-red-500">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 border border-blue-500">
        {days.map((day, index) => (
          <div
            key={index}
            className="flex justify-between p-1 gap-1 border border-black"
          >
            <div className="text-center font-medium text-gray-900">{day}</div>

            {isEditing ? (
              <div>
                <input
                  type="number"
                  value={idealValue[index] || ""}
                  onChange={(e) =>
                    handleIdealValueChange(index, e.target.value)
                  }
                  className="max-w-14 border border-black px-2 rounded-md"
                />
              </div>
            ) : (
              <div className="text-red-500">{idealValue[index] ?? "-"}</div>
            )}

            {isEditing ? (
              <div>
                <input
                  type="number"
                  value={actualValue[day] || ""}
                  onChange={(e) => handleActualValueChange(day, e.target.value)}
                  className="max-w-14 border border-black px-2 rounded-md"
                />
              </div>
            ) : (
              <div>{actualValue[day] ?? "--"}</div>
            )}
          </div>
        ))}
      </div>

      <div className="my-2">
        <button
          className="py-1 px-4 bg-orange-500 hover:bg-orange-600 rounded-md text-white"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
}
