"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Router } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { usersAll } from "@/lib/data";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1, "Please select your name"),
    commitment: z.string().min(1, "Please select your commitment status"),
    date: z.date({
        required_error: "Please select a date",
    }),
    day: z.number({
        required_error: "Please tell the day",
    }),
    comradeConnection: z.string().min(1, "Please select your connection type"),
    cuePerformance: z.enum(["yes", "no"], {
        required_error: "Please select yes or no",
    }),
    reflection: z.string().min(1, "Please enter your reflection"),
    timestamp: z.date({
        required_error:
            "Please give the exact date and time of filling the form",
    }),
    testDay: z.number(),
});

type FormValues = z.infer<typeof formSchema>;

const ReflectionForm = () => {
    const [successFlag, setSuccessFlag] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<String | null>(null);
    const router = useRouter() ; 
    const today = new Date();
    const dayOfMonth = today.getDate();
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            commitment: "",
            comradeConnection: "",
            cuePerformance: "no",
            reflection: "",
            day: dayOfMonth,
            timestamp: today,
        },
    });

    const onSubmit = async (data: FormValues) => {
        // Create current timestamp in IST
        const now = new Date();
        // Create a new object with updated timestamp
        const formDataWithTimestamp = {
            ...data,
            timestamp: now,
        };

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/reflect`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formDataWithTimestamp),
                }
            );
            const repData = await response.json();

            if (repData.success) {
                setSuccessFlag(true);
            } else {
                setErrorMessage(repData.message);
            }
        } catch (error) {
            console.log(
                "There is an error at fetching data at reflection form",
                error
            );
        }
    };

    return (
        <>
            <form onSubmit={form.handleSubmit(onSubmit)} className="m-3">
                {/* Header */}
                <div>
                    The error message is{" "}
                    {errorMessage ? errorMessage : "there is no error message"}
                </div>

                <div className="flex flex-col gap-2">
                    <h5 className="text-lg">Reflection Status</h5>
                    <p className="text-xs font-extralight">
                        "When performance is measured, performance improves.
                        When performance is measured and reported back, the rate
                        of improvement accelerates."
                    </p>
                </div>
                {/* choose you name */}

                <div className="bg-gray min-h-36 p-6 rounded-3xl mt-5">
                    <h3 className="text-xl text-text-100 mb-4">Who are you?</h3>
                    <div>
                        <Select
                            onValueChange={(value) =>
                                form.setValue("name", value)
                            }
                        >
                            <SelectTrigger className="w-full bg-white rounded-lg py-3 px-4 text-left text-gray-600 flex justify-between items-center shadow-xl h-12">
                                <SelectValue
                                    placeholder="Name"
                                    className="text-text-100"
                                />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                {usersAll.map((user, index) => {
                                    return (
                                        <SelectItem
                                            key={Number(index)}
                                            value={user}
                                        >
                                            {user}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                        {form.formState.errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.name.message}
                            </p>
                        )}
                    </div>
                </div>
                {/* first question */}
                <div className="bg-gray min-h-36 p-6 rounded-3xl mt-5">
                    <h3 className="text-xl text-text-100 mb-4">
                        Did you complete the commitment?
                    </h3>
                    <div>
                        <Select
                            onValueChange={(value) =>
                                form.setValue("commitment", value)
                            }
                        >
                            <SelectTrigger className="w-full bg-white rounded-lg py-3 px-4 text-left text-gray-600 flex justify-between items-center shadow-xl h-12">
                                <SelectValue
                                    placeholder="Choose"
                                    className="text-text-100"
                                />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="no">No</SelectItem>
                                <SelectItem value="gateway">
                                    Yes (Gateway)
                                </SelectItem>
                                <SelectItem value="plus">Yes (Plus)</SelectItem>
                                <SelectItem value="elite">
                                    Yes (Elite)
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {form.formState.errors.commitment && (
                            <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.commitment.message}
                            </p>
                        )}
                    </div>
                </div>
                {/* second question */}
                <div className="bg-gray min-h-36 p-6 rounded-3xl mt-5">
                    <h3 className="text-xl text-text-100 mb-4">
                        Date you did the habit statement?
                    </h3>
                    <div>
                        <Popover>
                            <PopoverTrigger asChild className="h-12 shadow-xl">
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !form.watch("date") &&
                                            "text-muted-foreground"
                                    )}
                                >
                                    <div className="flex flex-1 items-center justify-between">
                                        {form.watch("date") ? (
                                            format(form.watch("date"), "PPP")
                                        ) : (
                                            <span className="text-text-100 font-medium">
                                                Select Date
                                            </span>
                                        )}
                                        <CalendarIcon />
                                    </div>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={form.watch("date")}
                                    onSelect={(date) => {
                                        if (date) {
                                            form.setValue("date", date);
                                            form.setValue(
                                                "testDay",
                                                date.getDate()
                                            );
                                            console.log(date.getDate());
                                        }
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {form.formState.errors.date && (
                            <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.date.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* third question */}
                <div className="bg-gray min-h-36 p-6 rounded-3xl mt-5">
                    <h3 className="text-xl text-text-100 mb-4">
                        Did you make time to connect with your comrade?
                    </h3>
                    <p className="text-sm text-text-100 mb-2">
                        #1: Send a text to your comrade pair
                    </p>
                    <p className="text-sm text-text-100 mb-2">
                        #2: Do a 5min audio or video call
                    </p>
                    <p className="text-sm text-text-100 mb-4">
                        #3: Do a full fledged conversation of more than 30min
                    </p>
                    <div>
                        <Select
                            onValueChange={(value) =>
                                form.setValue("comradeConnection", value)
                            }
                        >
                            <SelectTrigger className="w-full bg-white rounded-lg py-3 px-4 text-left text-gray-600 flex justify-between items-center shadow-xl h-12">
                                <SelectValue
                                    placeholder="Choose"
                                    className="text-text-100"
                                />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="no">No</SelectItem>
                                <SelectItem value="option1">
                                    Option #1
                                </SelectItem>
                                <SelectItem value="option2">
                                    Option #2
                                </SelectItem>
                                <SelectItem value="option3">
                                    Option #3
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {form.formState.errors.comradeConnection && (
                            <p className="text-red-500 text-sm mt-1">
                                {
                                    form.formState.errors.comradeConnection
                                        .message
                                }
                            </p>
                        )}
                    </div>
                </div>
                {/* fourth question */}
                <div className="bg-gray min-h-36 p-6 rounded-3xl mt-5">
                    <h3 className="text-xl text-text-100 mb-4">
                        Did you perform the habit statement at your decided cue?
                    </h3>
                    <RadioGroup
                        defaultValue={form.watch("cuePerformance")}
                        onValueChange={(value) =>
                            form.setValue(
                                "cuePerformance",
                                value as "yes" | "no"
                            )
                        }
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="yes"
                                id="yes"
                                className="h-6 w-6"
                            />
                            <label htmlFor="yes" className="text-text-100">
                                Yes
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="no"
                                id="no"
                                className="h-6 w-6"
                            />
                            <label htmlFor="no" className="text-text-100">
                                No
                            </label>
                        </div>
                    </RadioGroup>
                    {form.formState.errors.cuePerformance && (
                        <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.cuePerformance.message}
                        </p>
                    )}
                </div>
                {/* fifth question - reflection prompts */}
                <div className="bg-gray min-h-36 p-6 rounded-3xl mt-5">
                    <h3 className="text-xl text-text-100 mb-6">
                        Reflection Prompts
                    </h3>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white p-2 rounded-lg">
                            <span
                                role="img"
                                aria-label="smile"
                                className="text-2xl"
                            >
                                😃
                            </span>
                        </div>
                        <p className="text-text-100">
                            How did your habit go today?
                        </p>
                    </div>
                    <h4 className="text-lg text-text-100 mb-3">Reflection</h4>
                    <textarea
                        {...form.register("reflection")}
                        placeholder="Type here..... :)"
                        className="w-full min-h-[120px] p-4 rounded-lg bg-white text-text-100 placeholder:text-text-100/60 resize-none"
                    />
                    {form.formState.errors.reflection && (
                        <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.reflection.message}
                        </p>
                    )}
                </div>
                {/* buttons */}

                {successFlag && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="flex flex-col bg-green-300 border-[1.5px] border-green-400 p-6 shadow-xl rounded-lg  ">
                            <h2 className="mb-4">
                                Success ! The form is filled{" "}
                            </h2>
                            <div className="flex gap-2 justify-center">

                            <button
                                className="bg-gray p-1 text-white "
                                onClick={() => {
                                    setSuccessFlag(false);
                                }}
                            >
                                Close
                            </button>

                            <button className="bg-blue-500 rounded-md  text-white p-1 " onClick={()=>{ router.push("/user-home")}}>
                                Stats 
                            </button>

                            </div>
                            
                        </div>
                    </div>
                )}

                
                <div className="flex gap-4 mt-8 mb-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1 bg-white text-text-100 rounded-lg py-3 px-4 h-12"
                        onClick={() => form.reset()}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 bg-primary text-white rounded-lg py-3 px-4 h-12"
                    >
                        Save Progress
                    </Button>
                </div>

                {/* the below is an error pop up  */}

                {errorMessage === null ? (
                    ""
                ) : (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className=" bg-white p-6 rounded-lg shadow-xl text-center">
                            <h2 className="font-bold text-red-900 text-md">
                                Error
                            </h2>

                            <h2 className="text-red-500 mb-4">
                                {errorMessage}
                            </h2>

                            <div className="flex gap-2 justify-around">

                            <Button
                                className="bg-primary text-white rounded-lg py-2 px-4"
                                onClick={() => {
                                    setErrorMessage(null);
                                }}
                            >
                            
                                Close
                            </Button>

                            <Button onClick={()=>( router.push(
                                "/user-home"
                            ))}>
                                Stats 
                            </Button>


                            </div>
                            
                        </div>
                    </div>
                )}
            </form>
        </>
    );
};

export default ReflectionForm;
