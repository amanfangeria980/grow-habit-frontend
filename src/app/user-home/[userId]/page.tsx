import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import "@/styles/animations.css";
import { Card } from "@/components/ui/card";
import { HabitGrid } from "../_components/HabitGrid";
import { CustomReflection } from "../_components/CustomReflection";
import ShowCustomReflection from "@/components/CustomReflection/ShowCustomReflection";

async function UserHomePage() {
  const auth = await getSession();
  console.log("The value of the user from the backend is ", auth?.user);
  // const name = auth?.user?.name?.split(" ")[0].toLowerCase();
  const userId = auth?.user?.id;

  if (!auth?.user) {
    redirect("/login");
  }

  const today = new Date().getDate();

  // Fetch user data server-side
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/user-graph/${userId}`,
    { cache: "no-store" }
  );
  const data = await response.json();
  const recordsArray = data.success ? data.data : [];
  const dataMatrix: Record<string, { commitment: string }> = {};
  let reflectionRate: any = "";
  let uniDays: any = [];

  if (data.success) {
    const today = new Date().getDate();

    uniDays = Array.from(new Set(recordsArray.map((r: any) => r.day))).sort(
      (a: any, b: any) => a - b
    );

    recordsArray.map((ref: any) => {
      if (ref.day < today) {
        dataMatrix[ref.day] = { commitment: ref.value };
      }
    });

    let reflectionScore = 0;

    uniDays.map((day: any) => {
      if (day < today) {
        if (
          dataMatrix[day].commitment === "gateway" ||
          dataMatrix[day].commitment === "no" ||
          dataMatrix[day].commitment === "plus" ||
          dataMatrix[day].commitment === "elite"
        ) {
          reflectionScore++;
        }
      }
    });

    reflectionRate = (reflectionScore / (today - 1)) * 100;
    console.log("This is the value of reflectionScore ", reflectionScore);
    console.log("This is the value of reflection rate ", reflectionRate);
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="text-center mb-4">
        <h1 className="text-xl font-semibold">Hi, {auth.user.name}</h1>

        <div className="flex gap-2 justify-center mt-2">
          <Card className="p-2 ">
            Your reflection rate is : <b> {`${reflectionRate}%` || ""} </b>
          </Card>
          {/* <Card className="p-2">
                            Your CoC score is : <b></b>
                        </Card> */}
        </div>
      </div>

      <HabitGrid recordsArray={recordsArray} today={today} />
      <div className="my-2">
        <CustomReflection userId={userId || ""} />
      </div>
      <div className="my-2">
        <ShowCustomReflection userId={userId || ""} />
      </div>

      <div className="mt-10">
        <h2>Weekly Score card : 1 - 7 </h2>
        <div>
          <h2>Level 1 : Check/ uncheck </h2>
          <p>Reflection Score : </p>
          <p>Gateway Score : </p>
        </div>
        <div>
          <h2>Level 2 : Check / Uncheck </h2>
          <p> Cue Rate : </p>
          <p>Plus Score : </p>
        </div>
        <div>
          <h2>Level 3 : Check / Uncheck</h2>
          <p>Frequent connection with commrade pair </p>
          <p> Constantly Updating your plus statement </p>
        </div>
      </div>
    </div>
  );
}

export default UserHomePage;
