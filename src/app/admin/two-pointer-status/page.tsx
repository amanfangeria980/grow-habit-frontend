
// Steps to perform : 
// 1. find today's date 
// 2. Pull the data of the past two days 
// 3. Use logic .ts to create the two pointer status


// Next action => Check Status 
"use client"

import { useState } from "react"
import { usersAll } from "@/lib/data"
const Page = ()=>{

    const [day, setDay] = useState<string>("")
    const [finStatus, setFinStatus]=useState<any>([])

   



    const fetchTwoPointerStatus = async(username : string , day : number)=>{

        const sendData = {

            username : username,
            day : day
    
        }
        const response = await fetch('http://localhost:5173/get-two-pointer-status', {method : "POST", headers : {'Content-Type' : 'application/json'}, body : JSON.stringify(sendData)})
        const repData = await response.json()
        console.log("The message from the backend ", repData)
        const results = repData.results ; 

        // console.log("Rep data value is for user", username,"is", repData)

        // console.log("The results boolean value is ", results)
        // console.log("The message from backend is ", repData.message)
      
            let {dayYesterday, dayBeforeYesterday} = repData.data ; 

            

            if(dayYesterday === "")
            {
                dayYesterday = "no"
            }
            if(dayBeforeYesterday === "")
            {
                dayBeforeYesterday = "no"
            }

            // console.log("The value of dayYesterday is ", dayYesterday) ; 
            // console.log("The value of dayBeforeYesterday is ", dayBeforeYesterday)

            const checkStatus = (dayYesterday : String, dayBeforeYesterday : String)=>{
                let status = ""

                if( dayYesterday === 'gateway' && dayBeforeYesterday === 'gateway')
                {
                    status = "duck"
                }
                else if(dayYesterday === 'gateway' && dayBeforeYesterday === 'no')
                {
                    status = "duck"
                }
                else if(dayYesterday === 'no' && dayBeforeYesterday === 'gateway')
                {
                    status = "crab"
                }
                else if(dayYesterday === 'no' && dayBeforeYesterday === 'no')
                {
                    status = "cross"
                }

                return status 

            }

            const status = checkStatus(dayYesterday, dayBeforeYesterday)

            let pushValue = {
                username : username, 
                status : status
            }

            let localFlag = true ; 

            finStatus.map((status : any)=>{

                if(status.username === username)
                {
                    localFlag = false ; 
                }

            })

            if(localFlag)
            {

                setFinStatus((prevFinStatus : any)=>[...prevFinStatus,pushValue])

            }

            
           
            

       
      
        

        
        
    }

    const calculateTwoPointer = (day : number)=>{

        setFinStatus([])
        console.log("This is the value before", finStatus)

        usersAll.map((user)=>{
            fetchTwoPointerStatus(user,day)
        })

        console.log("This is the value afterwards", finStatus)

        

    }


    return(
        <>
            <div>This is the admin page for generating 2 pointer status </div>
            <div>
                <h2>Date : </h2>
                
            </div>
            {day}
            
            <div>
                <input type="number" className="border-2 border-black bg-gray" min={1} max={25} value={day} onChange={(e)=> setDay(e.target.value)} />
                <button onClick={()=>{calculateTwoPointer(parseInt(day,10))}} className="border-2 border-black bg-gray-200 disabled:bg-red-400" disabled={!day || isNaN(parseInt(day, 10))}>Generate two pointer status </button>

            </div>

            <div>
                <h2>This is the finstatus</h2>
                {
                    JSON.stringify(finStatus)
                }

                <h2>Two Pointer Status for {day}</h2>

                {finStatus.map((status : any)=>{
                    return(

                        <div key={status.username}>
                            {status.username} : {status.status}
                        </div>

                    )
                })}
            </div>
        
        
        </>
    )
}

export default Page 