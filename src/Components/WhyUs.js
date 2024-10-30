import React from 'react'
import price from "../asset/Images/price.png"
import thumbsup from "../asset/Images/thumbsup.png"
import bus from "../asset/Images/bus.png"
import web from "../asset/Images/website.png"
import quality from "../asset/Images/quality.png"
import { NavLink } from 'react-router-dom'

function Catg() {
   
  const commonCss = ()=>{
    const className=" p-3 rounded-xl col-span-2  drop-shadow-lg hover:drop-shadow-xl duration-200 ease-in-out";
    return className;
  }
  return (
    <>

    <div className="mt-10 mb-5 text-3xl text-l-black font-semibold flex items-center justify-center font-roboto">
      <NavLink to='/SearchProducts'>
      <h1>Why Us?</h1>
      </NavLink>

    </div>
    <div className="   p-2 font-roboto">
    <div className="xl:mx-20 grid grid-cols-1 xl:grid-cols-5 gap-[28px] mx-2    rounded-xl">
    
    <div className={`bg-[#faf2e0] xl:col-span-1 ${commonCss()}`}>
      <div className=" 100 p-2 ">
      <div className="flex flex-col items-center justify-center">
      <img src={price} className='h-32  '/>
       <h1 className='text-xl font-semibold text-[#fc9e0f] mb-3'>Competitive Prices:</h1>
      </div>
       <p className='text-sm text-center px-5 text-l-black font-[450]  '>"Unbeatable prices. Uncompromised quality. Experience the perfect balance of value and satisfaction."</p>
      </div>

    </div>
     <div className={`bg-[#ffece8]  ${commonCss()}`}>
      <div className=" 100 p-2 py-4">
      <div className="flex flex-col items-center justify-center">
      <img src={thumbsup} className='h-32  '/>
       <h1 className='text-xl font-semibold text-[#f5acb3] mb-3'>High-Quality Products</h1>
      </div>
       <p className='text-sm text-center px-5 text-l-black font-[450]  '>
"Uncompromising quality, meticulously crafted. Our products surpass rigorous standards, delivering durability, functionality, and unrivaled satisfaction."</p>
      </div>
     </div>
     
     <div className={`bg-[#443c4e] row-span-2  ${commonCss()}`}>
      <div className="100 p-2  flex  flex-col  h-full items-center  justify-center">
      <div className="flex flex-col items-center justify-center">
      <img src={bus} className='h-[300px] mb-3  '/>
       <h1 className='text-xl font-semibold text-[#f256f5] mb-3'>Competitive Prices</h1>
      </div>
       <p className='text-sm text-center px-5 text-eee font-[450]  '>"Impeccable hygiene, flawless delivery. SANS goods arrive meticulously packed for an unparalleled customer experience."</p>
      </div>
     </div>

     <div className={` bg-purple-200  ${commonCss()}`}>
      <div className="100 p-2 items-center  justify-center">
      <div className=" flex flex-col items-center justify-center">
      <img src={web} className='h-48  '/>
       <h1 className='text-xl font-semibold text-[#d160fd] mb-3'>Seamless Shopping Experience</h1>
       <p className='text-sm text-center px-8 text-l-black font-[450]  '>
"Discover a seamless shopping experience with our intuitively designed, user-friendly interface, simplifying your search for the perfect products."</p>
      </div>
      </div>
     </div>
     
     
     <div className={`bg-[#d9f8e8] xl:col-span-1 ${commonCss()}`}>
      <div className="100 p-2 items-center  justify-center">
      <div className="flex flex-col items-center justify-center">
      <img src={quality} className='h-32 mb-5  '/>
       <h1 className='text-xl font-semibold text-[#40ee97] mb-3'>Competitive Prices:</h1>
      </div>
       <p className='text-sm text-center px-5 text-l-black font-[450]  '>"Unbeatable prices. Uncompromised quality. Experience the perfect balance of value and satisfaction."</p>
      </div>


      
    </div>
    </div>
    </div>
    </>
  )
}



export default Catg