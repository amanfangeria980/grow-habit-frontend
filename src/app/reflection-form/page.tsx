"use client";
import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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

const formSchema = z.object({
  name: z.string().min(1, "Please select your name"),
  commitment: z.string().min(1, "Please select your commitment status"),
  date: z.date({
    required_error: "Please select a date",
  }),
  day : z.number({
    required_error : "Please tell the day"
  }),
  comradeConnection: z.string().min(1, "Please select your connection type"),
  cuePerformance: z.enum(["yes", "no"], {
    required_error: "Please select yes or no",
  }),
  reflection: z.string().min(1, "Please enter your reflection"),
  timestamp : z.date({
    required_error : "Please give the exact date and time of filling the form"
  }),
  testDay : z.number()
});

type FormValues = z.infer<typeof formSchema>;

const ReflectionForm = () => {
  const today = new Date() ; 
  const dayOfMonth = today.getDate() ; 
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      commitment: "",
      comradeConnection: "",
      cuePerformance: "no",
      reflection: "",
      day : dayOfMonth, 
      timestamp : today
    },
  });

  const onSubmit = async(data: FormValues) => {
    console.log("This is the data ", data)

   
    try{


    const response = await fetch('http://localhost:5173/reflect', {method : "POST", headers : {'Content-Type': "application/json"}, body : JSON.stringify(data)})
    const repData = await response.json() ; 
    console.log("message from server : ",repData.message)
    console.log("Form Data:", data);


    }
    catch(error)
    {
      console.log("There is an error at fetching data at reflection form", error)
    }
    
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="m-3">
      {/* Header */}
      
      <div className="flex flex-col gap-2">
        <h5 className="text-lg">Reflection Status</h5>
        <p className="text-xs font-extralight">
          "When performance is measured, performance improves. When performance
          is measured and reported back, the rate of improvement accelerates."
        </p>
      </div>
      {/* choose you name */}
      <div className="bg-gray min-h-36 p-6 rounded-3xl mt-5">
        <h3 className="text-xl text-text-100 mb-4">Who are you?</h3>
        <div>
          <Select onValueChange={(value) => form.setValue("name", value)}>
            <SelectTrigger className="w-full bg-white rounded-lg py-3 px-4 text-left text-gray-600 flex justify-between items-center shadow-xl h-12">
              <SelectValue placeholder="Name" className="text-text-100" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="parth">Parth</SelectItem>
              <SelectItem value="aman">Aman</SelectItem>
              
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
          <Select onValueChange={(value) => form.setValue("commitment", value)}>
            <SelectTrigger className="w-full bg-white rounded-lg py-3 px-4 text-left text-gray-600 flex justify-between items-center shadow-xl h-12">
              <SelectValue placeholder="Choose" className="text-text-100" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="gateway">Yes (Gateway)</SelectItem>
              <SelectItem value="plus">Yes (Plus)</SelectItem>
              <SelectItem value="elite">Yes (Elite)</SelectItem>
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
                  !form.watch("date") && "text-muted-foreground"
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
                  if(date)
                  {
                    form.setValue("date", date)
                    form.setValue("testDay", date.getDate())
                    console.log(date.getDate())
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
            onValueChange={(value) => form.setValue("comradeConnection", value)}
          >
            <SelectTrigger className="w-full bg-white rounded-lg py-3 px-4 text-left text-gray-600 flex justify-between items-center shadow-xl h-12">
              <SelectValue placeholder="Choose" className="text-text-100" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="option1">Option #1</SelectItem>
              <SelectItem value="option2">Option #2</SelectItem>
              <SelectItem value="option3">Option #3</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.comradeConnection && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.comradeConnection.message}
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
            form.setValue("cuePerformance", value as "yes" | "no")
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" className="h-6 w-6" />
            <label htmlFor="yes" className="text-text-100">
              Yes
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" className="h-6 w-6" />
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
        <h3 className="text-xl text-text-100 mb-6">Reflection Prompts</h3>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white p-2 rounded-lg">
            <span role="img" aria-label="smile" className="text-2xl">
              😃
            </span>
          </div>
          <p className="text-text-100">How did your habit go today?</p>
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
    </form>
  );
};

export default ReflectionForm;