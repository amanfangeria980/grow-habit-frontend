
// Steps to perform : 
// 1. find today's date 
// 2. Pull the data of the past two days 
// 3. Use logic .ts to create the two pointer status


// Next action => You have got you need from database , now write logic for diplaying the two pointer status on the front end using the logic.js file in aman's code 
"use client"
const Page = ()=>{



    const fetchTwoPointerStatus = async()=>{

        const sendData = {

            username : "parth",
            day : 3
    
        }
        const response = await fetch('http://localhost:5173/get-two-pointer-status', {method : "POST", headers : {'Content-Type' : 'application/json'}, body : JSON.stringify(sendData)})
        const repData = await response.json()
        const {dayYesterday, dayBeforeYesterday} = repData ; 

        console.log("The value of dayYesterday is ", dayYesterday) ; 
        console.log("The value of dayBeforeYesterday is ", dayBeforeYesterday)

        
        
    }
    return(
        <>
            <div>This is the admin page for generating 2 pointer status </div>
            <div>
                <button onClick={fetchTwoPointerStatus}>Generate two pointer status </button>
            </div>
        
        
        </>
    )
}

export default Page 