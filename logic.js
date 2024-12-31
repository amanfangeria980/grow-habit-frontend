const userData = {
    "parth": {
        logBook:[
            {
              "title": 1,
              "status": "false"
            },
            {
              "title": 2,
              "status": "true"
            },
            {
              "title": 3,
              "status": "false"
            },
            {
              "title": 4,
              "status": "false"
            }
          ],
          fineBook:[

          ]
    }
}

const maxDay=25;
const findStatusForDay=(day,user)=>{
    if(day===1){
        return 'Not Enough Data';
    }
    else if(day===2){
        const yesterday=userData[user].logBook[day-2].status;
        if(yesterday==="true"){
            return "Duck";
        }
        else{
            return "Crab";
        }
    }
    else if(day>maxDay){
        return "Invalid Day"
    }
    const yesterday=userData[user].logBook[day-2].status;
    const dayBeforeYesterday=userData[user].logBook[day-3].status;

    if(yesterday==='true' && dayBeforeYesterday==="true"){
        return 'Duck';
    }
    else if(yesterday=="true" && dayBeforeYesterday==="false"){
        return "Duck";
    }
    else if(yesterday==="false" && dayBeforeYesterday==="true"){
        return "Crab";
    }
    else if(yesterday==="false" && dayBeforeYesterday==="false"){
        userData[user].fineBook.push({
            date: new Date().toLocaleString('en-US', { 
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }),
            fine: 100,
        })
        console.log(userData[user].fineBook)
        return "X";
    }
}

console.log(findStatusForDay(5,"parth"));


