import React from 'react'

const HomePage = () => {
  return (
    <>

    <div className='bg-gray-50 min-h-screen'>

   

      <div className='min-h-screen bg-black text-white flex flex-col items-center justify-center px-2'>

   

          <h2 className='text-3xl mb-4'>Better State of Mind for More People </h2>
          <h3 className='text-2xl mb-6'>Build better habits for a better life </h3>
          <button className='bg-white rounded-full px-6 py-2 text-blue-500 '>Get Started</button>

      

        
        
      </div>

      <div className='mb-6'>
        <div className='text-black font-bold text-2xl text-center py-4 '>
          Why Choose Us ? 
        </div>

        <div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
         {
          [
            {
              title : "Never Miss Two Days",
              description : "Stay on track with consistence rules"
            },
            {
              title : "Fines", 
              description : "Build accountability with financial stakes"
            }, 
            {
              title : "Mutual Accountability",
              description : "Track habits with a partner for motivation"
            },
            {
              title : "Reflection", 
              description : "learn and improve guided relfections"
            }
          ].map((feature, index)=>{
            return(
              
                <div key={index} className='text-center shadow-md p-6 rounded-lg border-[1.5px] border-blue-400'>
                  <h2 className='mb-2 text-xl font-semibold'>{feature.title}</h2>
                  <p>{feature.description}</p>

                </div>
              
            )
          })
         }
            

        </div>

        </div>
        
      </div>

      <div className='bg-black flex flex-col items-center py-4 justify-center'>
          
            <h2 className='text-2xl font-bold text-white mb-2'>Ready to Build Better Habits ?</h2>
            <button className='bg-white text-blue-600 rounded-full px-6 py-2'> Join Now </button>

          
      </div>

      </div>
    
    
    
    </>
  )
}

export default HomePage
