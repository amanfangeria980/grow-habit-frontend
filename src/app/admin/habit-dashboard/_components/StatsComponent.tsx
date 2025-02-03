"use client"
import { useState, useEffect } from "react";
export function StatsComponent({reflections, users, uniDays, dataMatrix} : {reflections : any, users : any, uniDays : any, dataMatrix : any}){

    const reflectionRate : Record<string, number> = { }  ; 
    let today = new Date() ; 
    let totalNum = today.getDate() -1 ; 

    users.forEach((user : any)=>{

        let reflectionScore = 0 ; 

        uniDays.forEach((day : any)=>{

            if(Number(day) > totalNum)
            {}

           

            if(dataMatrix[day][user])
            {
                const reflection = dataMatrix[day][user] ; 

            if(reflection === 'no' || reflection === 'yes' || reflection === 'gateway' || reflection === 'plus' || reflection === 'elite')
            {
                reflectionScore++ ; 
            }

            }
            
            

        })

        reflectionRate[user] = (reflectionScore/totalNum)*100 ; 

    })

    console.log("These are the reflection rates : ", reflectionRate)


    
   
    return(<>


        <div>
            <h2>This is a stats component </h2>
            <div>

                {
                    JSON.stringify(dataMatrix)
                }
              
            </div>
            <table className="border-2 border-black">
                <thead>
                <tr className="border-2 border-black">
                    <Tcomp>Name</Tcomp>
                    <Tcomp>Reflection Rate</Tcomp>
                    <Tcomp>Consistency</Tcomp>
                    <Tcomp>Cue</Tcomp>
                    <Tcomp>Push Rate</Tcomp>
                    <Tcomp>CoC</Tcomp>
                    
                </tr>

                {
                    users.map((user : any, index : number)=>{

                        return(
                            <Trcomp key={index}>
                                <Tcomp>{user}</Tcomp>
                                <Tcomp>{reflectionRate[user]}</Tcomp>
                            </Trcomp>
                        )
                        
                    })
                }

                </thead>
               
            </table>
        </div>
    
    
    
    
    </>)
}


function Tcomp({children} : {children : any}){
    return(
        <th className="border-2 border-black">
            {children}
            
        </th>
    )
}

function Trcomp({children} : {children : any}){
    return(
        <tr className="border-2 border-black">
            {children}
            
        </tr>
    )
}