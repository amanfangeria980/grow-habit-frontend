import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "./ui/select";
import { FormValues } from "@/app/reflection-form/page";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";

export interface SelectUserProps {
    name : string, 
    id : string, 
}
interface SelectUserInputProps {
    form : UseFormReturn<FormValues>, 
    usersAll : SelectUserProps[],



}
export const SelectUserInput = ({form, usersAll}:SelectUserInputProps) => {

    return <div>
    <Select
        onValueChange={(value) =>{

            const userData = JSON.parse(value); 
            form.setValue("name", userData.name)
            form.setValue("userId", userData.id)

        }
           
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
                        value={JSON.stringify(user)}
                    >
                        {user.name}
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
</div>;
};


