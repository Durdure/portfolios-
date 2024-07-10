import React from 'react'

function Hero() {
  return (
    <div className='flex flex-col justify-center items-center'>
        <div className='flex flex flex-col justify-center items-center tracking-wider'>
            <h1 className='pb-4 text-5xl font-bold font-kaushan'>
                Duresa Eshetu
            </h1>
            <h3 className='pb-4 text-2xl font-bold font-kaushan'>FrontEnd Developer</h3>
        </div>
        <div className='p-2'>
            <button className='p-2 text-x1 w-[180px] font-kaushan'>
                Explore
            </button>
        </div>
    </div>
  )
}

export default Hero