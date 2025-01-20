import { getSession } from "@/lib/getSession";
import React from "react";
import SaveDetailsForm from "./_components/SaveDetailsForm";
// saves phone number and email id to firebase after google sign in
const saveDetails = async () => {
    const auth = await getSession();
    // instead of getting the email id from the auth object, get it from the local storage/redux/context
    return <SaveDetailsForm email={auth?.user?.email || ""} />;
};

export default saveDetails;
