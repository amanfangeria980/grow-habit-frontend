"use client"
import { useState, useEffect } from "react";
export function StatsComponent({reflections, users, uniDays, dataMatrix} : {reflections : any, users : any, uniDays : any, dataMatrix : any}){

    let reflectionRate : Record<string, number> = {}  ; 
    let consistentRate : Record<string, number> = {} ; 
    let cueRate : Record<string, number> = {} ; 
    let comradeRate : Record<string, number> = {} ; 
    let pushRate : Record<string, number> = {} ; 
    let today = new Date() ; 
    let totalNum = today.getDate() -1 ; 

    users.forEach((user : any)=>{

        let reflectionScore = 0 ; 
        let consistentScore = 0 ; 
        let pushScore = 0 ; 
        let cueScore = 0 ; 
        let comradeScore = 0 ; 


        uniDays.forEach((day : any)=>{

            if(Number(day) <= totalNum)
            {
                if(dataMatrix[day][user])
                {
                    const reflection = dataMatrix[day][user].commitment; 
                    const cueReflection = dataMatrix[day][user].cuePerformance ; 
                    const comradeReflection = dataMatrix[day][user].comradeConnection ; 
    
                    if(reflection === 'no' || reflection === 'yes' || reflection === 'gateway' || reflection === 'plus' || reflection === 'elite')
                    {
                        reflectionScore++ ; 
                    }

                    if(reflection === 'yes' || reflection === 'gateway' || reflection === 'plus' || reflection === 'elite')
                    {
                        consistentScore++ ; 
                    }

                    if(reflection === 'yes' || reflection ===  "plus" || reflection === "elite")
                    {
                        pushScore++ ; 

                    }

                    if(cueReflection === "yes")
                    {
                        cueScore++ ; 
                    }

                    if(comradeReflection === "yes")
                    {
                        comradeScore++ ; 
                    }
    
                }
            }

           

            
            
            

        })

        reflectionRate[user] = (reflectionScore/totalNum)*100 ; 
        consistentRate[user] = (consistentScore/totalNum)*100 ; 
        pushRate[user] = (pushScore/totalNum)*100 ; 
        cueRate[user] = (cueScore/totalNum)*100 ; 
        comradeRate[user] = (comradeScore/totalNum)*100 ; 

    })

   


    
   
    return(<>


        <div>
            <h2>This is a stats component </h2>
            {/* <div>

                {
                    JSON.stringify(dataMatrix)
                }
              
            </div> */}
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
                                <Tcomp>{Math.round(reflectionRate[user])}</Tcomp>
                                <Tcomp>{Math.round(consistentRate[user])}</Tcomp>
                                <Tcomp> {Math.round(cueRate[user])} </Tcomp>
                                <Tcomp>{Math.round(pushRate[user])}</Tcomp>
                                <Tcomp>{Math.round(comradeRate[user])}</Tcomp>

                                
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
        <th className="border-2 border-black py-1 px-2">
            {children}
            
        </th>
    )
}

function Trcomp({children} : {children : any}){
    return(
        <tr className="border-2 border-black py-1 px-2">
            {children}
            
        </tr>
    )
}