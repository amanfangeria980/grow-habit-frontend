"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MNKGroups } from "@/utils/types";
import { useEffect, useState } from "react";

export default function Page() {
  const [openMNK, setOpenMNK] = useState<boolean>(false);
  const [mnkName, setMnkName] = useState<string>("");
  const [mnkGroups, setMNKGroups] = useState<any>([]);
  const [openGroup, setOpenGroup] = useState<any>(null);
  const [mnkUsers, setMNKUsers]  = useState<any>([]) ; 
  const [openMNKDetails, setOpenMNKDetails] = useState<any>(null) ; 

  // const dummyUsers = [
  //   {
  //     "id": 1,
  //     "name": "John Doe",
  //     "email": "john.doe@example.com",
  //     "role": "Admin",
  //     "status": "Active",
  //     "createdAt": "2024-01-15T10:30:00Z"
  //   },
  //   {
  //     "id": 2,
  //     "name": "Jane Smith",
  //     "email": "jane.smith@example.com",
  //     "role": "User",
  //     "status": "Inactive",
  //     "createdAt": "2024-01-12T14:20:00Z"
  //   },
  //   {
  //     "id": 3,
  //     "name": "Alice Johnson",
  //     "email": "alice.johnson@example.com",
  //     "role": "Moderator",
  //     "status": "Active",
  //     "createdAt": "2024-01-18T08:45:00Z"
  //   },
  //   {
  //     "id": 4,
  //     "name": "Bob Williams",
  //     "email": "bob.williams@example.com",
  //     "role": "User",
  //     "status": "Pending",
  //     "createdAt": "2024-01-10T17:00:00Z"
  //   },
  //   {
  //     "id": 5,
  //     "name": "Charlie Brown",
  //     "email": "charlie.brown@example.com",
  //     "role": "Admin",
  //     "status": "Active",
  //     "createdAt": "2024-01-05T12:10:00Z"
  //   }
  // ]
  

  const handleCreateMNK = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/create-mnk`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: mnkName }),
      }
    );
    const repData = await response.json();
    console.log("the value from backend is ", repData);
    setOpenMNK(false);
  };

  const fetchMNKGroups = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-mnk`,
      { method: "GET" }
    );
    const repData = await response.json();
    setMNKGroups(repData.data);
    console.log(
      "The value from backend route ( /admin/get-mnk ) is : ",
      repData
    );
  };

  const fetchMNKUsers = async()=>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-mnk-users`, {method : "GET"})
    const repData = await response.json() ; 
    setMNKUsers(repData.data) ; 
    console.log("The value of users from backend is", repData)
  }

  useEffect(() => {
    fetchMNKGroups();
    fetchMNKUsers() ; 
  }, []);
  return (
    <>
  <div className="flex justify-evenly gap-2">

    <div className="w-[35%]">

        

      
      <div className="m-2">
        <Button
          onClick={() => {
            setOpenMNK(true);
          }}
        >
          {" "}
          Create a MNK Group{" "}
        </Button>
      </div>

      {/* This is the modal for opening the selected MNK  */}

      {openMNK && (
        <div className="fixed inset-0 flex justify-center items-center  bg-black bg-opacity-50">
          <Card className=" items-center p-3 w-[30%] h-[40%] flex flex-col justify-around ">
            {JSON.stringify(mnkName)}

            <Input
              value={mnkName}
              onChange={(e: any) => {
                setMnkName(e.target.value);
              }}
              placeholder="Enter the name"
            />

            <div className="flex justify-around gap-4 ">
              <Button
                onClick={() => {
                  setOpenMNK(false);
                }}
              >
                Close
              </Button>
              <Button onClick={handleCreateMNK}>Save</Button>
            </div>
          </Card>
        </div>
      )}

      <div>
        This is page for managing mnk groups
        <Card>
          {/* {
              JSON.stringify(mnkGroups)
            } */}
          <CardHeader>All MNK Groups</CardHeader>
          {mnkGroups.length > 0 &&
            mnkGroups.map((group: any, index: number) => {
              return (
                <div key={index}>
                  <CardContent className="flex gap-2">
                    <h2>{group.name}</h2>
                    <Button
                      onClick={() => {
                        setOpenGroup(group);
                      }} 
                      size={"sm"}
                    >
                      Add Users 
                    </Button>
                    <Button size={"sm"} onClick={()=>{setOpenMNKDetails(group)}}>
                      See Details 
                    </Button>
                  </CardContent>
                </div>
              );
            })}
        </Card>
        {/* This is the popup modal for openGroup */}
        {openGroup && (
          <div className="fixed inset-0 flex justify-center items-center  bg-black bg-opacity-50">
            <GroupCard setOpenGroup={setOpenGroup} openGroup={openGroup} mnkUsers={mnkUsers} />
          </div>
        )}
      </div>

      <div>Current going MNK groups</div>

      </div>

      <Card className="w-[50%] px-4 py-4">

        {/* This is shows the details of the MNK */}

        {
          openMNKDetails && <GroupCardDetails setOpenMNKDetails={setOpenMNKDetails}  openMNKDetails={openMNKDetails}/>
        }
        
      </Card>

      </div>
    </>
  );
}


function GroupCard({setOpenGroup, openGroup, mnkUsers}:{setOpenGroup : any, openGroup : any, mnkUsers : any}){
  const addToMNK = async(userId : string, mnkId : string)=>{

    const sendData = {
      userId , 
      mnkId 
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/add-user-mnk`, {method : "POST", headers : {'Content-Type' : 'application/json'}, body : JSON.stringify(sendData)})
    const repData = await response.json() ; 
    console.log("The data from backend (addToMNK route) is ", repData) ; 

  }
  return(

    <Card className=" items-center p-3 w-[30%] h-[40%] flex flex-col justify-around ">
              <h2>{openGroup.name}</h2>
              <p>Users List : </p>
              <Card className="max-h-[150px] p-2   overflow-y-scroll border-black border-2">
                {mnkUsers.map((user : any)=>{
                  return(
                    <Card key={user.id} className="flex gap-2 p-1 m-1">

                      <h2>{user.fullName}</h2>
                      <Button onClick={()=>{addToMNK(user.id, openGroup.id)}} size={"sm"} className="">Add</Button>

                    </Card>
                  )
                })}
              </Card>

              <Button onClick={()=>{setOpenGroup(null)}}>Close</Button>
      </Card>

  )
}

function GroupCardDetails({openMNKDetails, setOpenMNKDetails} : { openMNKDetails : any, setOpenMNKDetails : any}){

  const users = openMNKDetails.users ; 
  console.log("This is the value of the users ", users) ; 






  return(
    <div>
      

      <Card className="mx-2 my-2">
        <CardHeader>
          <CardTitle className="text-center"><h2>{openMNKDetails.name}</h2></CardTitle>
        </CardHeader>
      </Card>
      

      <Card className="mx-2 my-2">
      <CardHeader>
        <CardTitle> Members </CardTitle>
      </CardHeader>
      <CardContent>
      {

        (users.length > 0 && users ) ? (

        users.map((user : any)=>{

          return(
            <div key={user.userId} className="flex gap-2 m-2">

              <h2>{user.name}</h2>

              <Button size={"sm"} >Remove</Button>

            </div>
          )

        })) : <div>No members yet !</div>
        
      }

</CardContent>

      </Card>
      <Button onClick={()=>{setOpenMNKDetails(null)}}>Close Details</Button>
      
    </div>
  )

}
