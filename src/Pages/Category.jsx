import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import { ImPencil } from 'react-icons/im'
import { FaTrashAlt } from 'react-icons/fa'


function Category() {
  const [catg, setCatg] = useState([
    {
      name: "Phone",
    },
    {
      name: "Laptop",
    },
    {
      name: "Shoe",
    },
  ]);

  const removeCatg = (index) => {
    const updatedCatg = catg.filter((_, i) => i !== index);
    setCatg(updatedCatg);
  };
    
    const countItems = catg.length
  return (
     <>
      <div className='ml-24 lg:ml-72 pr-[1rem] xl:pr-8 -mt-[1px]    h-screen pt-8 '>
      <div className="flex justify-between py-4 items-center font-poppins  bg-eee shadow-md  p-3 ">
      <div className="flex space-x-2 justify-center items-center">
        <h1 className='text-lg font-[550] ml-2'>Categories</h1>
        <h1 className='text-lg font-[550] bg-l-black flex justify-center items-center w-7 h-7 text-[13px]  rounded-full text-white'>{countItems}</h1>
      </div>
      <div className="">
      <NavLink to='/CreateCatg'  className='bg-[#7380ec] py-3  p-2 px-4 text-sm hover:bg-[#6f7cf6] hover:drop-shadow-sm hover:scale-[1.02] ease-linear duration-150 rounded-full flex text-white justify-center items-center'>
        <AiOutlinePlus className="mr-1 text-lg"/>
          <h1>Add Categories </h1>
      </NavLink>
      </div>
      </div>
      <div className=" flex flex-col justify-center ">
     <div className="mt-10  pl-5 text-xl font-semibold mb-5">
        <h1>List of Categories</h1>
     </div>
      <div className=" ">
        {catg.map((items,index)=>(
            <div className=" rounded-xl shadow-lg bg-eee mt-5  h-24 w-[80vh] hover:drop-shadow-sm duration-150 ease-in-out  border justify-between pl-5 space-x-5 xl:space-x-20 py-1 flex items-center px-2">
            {/* <div className="w-[35%] xl:w-[15%] h-[90%] "> */}
                {/* <img className='w-[100%] h-[100%] object-cover rounded-xl' src={items.img} alt="productImg" /> */}
            {/* </div> */}
            <div className="flex  space-x-3 xl:space-x-32 ">
            <h1 className='font-semibold text-l-black  '>{index+1}. {items.name}</h1>
            {/* <h1 className='font-semibold text-l-black'>${items.price}</h1> */}
            {/* <h1 className='hidden xl:block font-semibold text-l-black'>In stock</h1> */}
            </div>
            <div className="flex   w-[30%] justify-end pr-10 space-x-10 h-10 items-center">
            <ImPencil className='bg-[#ff0000] w-7 h-7 p-2    xl:w-9 xl:h-9 xl:p-2 text-[15px] font-bold flex  rounded-full cursor-pointer hover:scale-[1.04] ease-out duration-200  text-white'/>
            <FaTrashAlt onClick={()=>removeCatg(index)}  className='bg-[#116dff] w-7 h-7 p-2 xl:w-9 xl:h-9 xl:p-2 text-[10px] flex  rounded-full cursor-pointer hover:scale-[1.04] ease-out duration-200  text-white'/>
            </div>
            </div>
        ))}
      </div>
      </div>
      </div>
    </>
  )
}

export default Category