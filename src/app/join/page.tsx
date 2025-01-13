
export default function Page(){

    return(
        <>
            <div className="min-h-screen bg-gray-50  flex items-center justify-center ">
                <div className="border-[1.5px] rounded-lg  w-[60%] h-[50vh] border-blue-500 shadow-md flex flex-col gap-6 items-center justify-center">
                    <h1 className="text-2xl font-semibold">Join GrowHabit</h1>
                    <div className="flex flex-col">
                        <label htmlFor="" className="text-sm">Name</label>
                        <input type="text" placeholder="Enter your name" className="border-[1px] rounded-md py-2 px-2 border-black" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="text-sm">Phone No.</label>
                        <input type="text" placeholder="Enter your phone no." className="border-[1px] rounded-md py-2 px-2 border-black" />
                    </div>
                    <div>
                        <button className="border-4 border-blue-400 px-6 rounded-full py-2">Submit</button>
                    </div>
                </div>

            </div>
            
        
        </>
    )

}