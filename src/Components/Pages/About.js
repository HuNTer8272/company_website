import React from 'react'
import about from '../../asset/Images/about.png'

function About() {
  const commonCSs =()=>{
   const className= 'rounded-xl w-full h-full '
   return className
  };
  
  return (
    <>
     
     <div className="mt-28 flex flex-col-reverse lg:flex-row  py-5  ">
        <div className="pt-5   lg:w-[50%] lg:h-[80vh] xl:pt-0 font-roboto flex flex-col sm:px-28 ">
       <h1 className='text-2xl font-[450] xl:text-4xl text-l-black pb-3 lg:pt-16 xl:pt-32 2xl:pt-44 lg:pb-5 lg:px-12  px-12 '>About Us</h1>
       <p className='text-sm xl:text-[15px] font-[400] lg:my-0 lg:px-20 lg:pb-5 lg:-ml-7  ml-12  text-l-black pb-3  w-[43vh]   sm:w-[60vh] lg:w-[60vh] xl:w-[70vh] 2xl:w-[78vh]'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore, incidunt aperiam. Doloribus culpa quidem eos praesentium dignissimos porro quo dicta. Aliquid totam odit quaerat quod libero at nemo error tempora!</p>
       <p className='text-sm xl:text-[15px] font-[400] lg:py-0 lg:px-20 lg:pb-5 lg:-ml-7 ml-12 text-l-black pb-3  w-[43vh]   sm:w-[60vh] lg:w-[60vh] xl:w-[70vh] 2xl:w-[78vh] '> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore, incidunt aperiam. Doloribus culpa quidem eos praesentium dignissimos porro quo dicta. Aliquid totam odit quaerat quod libero at nemo error tempora!</p>
     <div className="grid grid-cols-3 gap-0  mt-5 mx-[75px] xl:mx-[55px]     ">
      <div className=" bg-l-black col-span-1 cursor-pointer  text-center m-0 text-white -skew-x-[9deg]  duration-200 ease-in-out p-2 ">
        <h1 className='text-[20px]'>100+</h1>
        <h1 className='text-[15px]'>brands</h1>
      </div>
      <div className=" bg-l-black col-span-1 cursor-pointer  text-center m-0 text-white -skew-x-[9deg]  duration-200 ease-in-out p-2 ">
        <h1 className='text-[20px]'>100+</h1>
        <h1 className='text-[15px]'>brands</h1>
      </div>
      <div className=" bg-l-black col-span-1 cursor-pointer  text-center m-0 text-white -skew-x-[9deg]  duration-200 ease-in-out p-2 ">
        <h1 className='text-[20px]'>100+</h1>
        <h1 className='text-[15px]'>brands</h1>
      </div>
  
      
  
      
   
   
    
    
     </div>
      </div>
      <div className="grid grid-cols-3 gap-2 lg:w-[50%] lg:h-[80vh] mx-5 xl:py-16 ">
        <div className={` row-span-2 col-span-2 ${commonCSs()}`}> <img className='w-full h-full object-cover rounded-xl' src={about} /></div>
        <div className={` col-span-1   ${commonCSs()}`}><img className='rounded-xl h-full w-full object-cover' src='https://images.unsplash.com/photo-1617043983671-adaadcaa2460?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' /></div>
        <div className={` col-span-1   ${commonCSs()}`}><img className='rounded-xl h-full w-full object-cover' src='https://images.unsplash.com/photo-1617043786394-f977fa12eddf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' /></div>
      </div>
     </div>
    </>
  
  )
}

export default About;