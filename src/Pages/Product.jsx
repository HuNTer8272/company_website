import React, { useEffect, useState } from 'react'
import { firestore,storage } from '../../../Server/Firbase'
import {AiOutlinePlus} from "react-icons/ai"
import {FaTrashAlt} from "react-icons/fa"
import {ImPencil} from "react-icons/im"
import { NavLink } from 'react-router-dom'
import { doc, deleteDoc } from "firebase/firestore";

function Product() {
   
    const[products,setProducts] = useState([]);

    useEffect(() => {
      const unsubscribe = firestore.collection('products').onSnapshot((snapshot) => {
        const productData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productData);
      });
    
      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    }, []);
    


   const handleDelete = async (id) => {
     try {
      console.log(id)
       const querySnapshot =firestore.collection('products').where('id','==',id).get();
       if(!querySnapshot.empty){
         console.log(querySnapshot);
         const doc = (await querySnapshot).docs[0];
         console.log(doc)
         console.log(doc.data())
         await doc.ref.delete();
       }
      //  await deleteDoc(doc(firestore, "products", id));
       console.log("Product deleted successfully");
     } catch (error) {
       console.error("Error deleting product:", error.message);
     }
   };
   
  
  

    const countItems = products.length;
  return (
    <>
      <div className='ml-[6.5rem] lg:ml-72 pr-[1rem] xl:pr-8 2xl:w-[178vh]  fixed rounded-[8px]  h-screen  -mt-[38px] '>
      <div className="flex justify-between py-4 items-center font-poppins  rounded-[5px]   bg-eee shadow-md  p-3 ">
      <div className="flex items-center justify-center space-x-2">
        <h1 className='text-lg font-[550] ml-2'>Product</h1>
        <h1 className='text-lg font-[550] bg-l-black flex justify-center items-center w-7 h-7 text-[13px]  rounded-full text-white'>{countItems}</h1>
      </div>
      <div className="">
      <NavLink to='/CreateProduct'  className='bg-[#7380ec] py-3  p-2 px-4 text-sm hover:bg-[#6f7cf6] hover:drop-shadow-sm hover:scale-[1.02] ease-linear duration-150 rounded-full flex text-white justify-center items-center'>
        <AiOutlinePlus className="mr-1 text-lg"/>
          <h1>Add Products </h1>
      </NavLink>
      </div>
      </div>
      {countItems===0?(
        <div className="flex flex-col items-center justify-center px-5 pt-5 mt-32  xl:mt-5">
        <div className=" w-full xl:w-[110vh] xl:h-[70vh]">
       <img className='w-[100%] h-[100%] object-cover' src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png?f=webp" alt="" />
        </div>
        <div className="flex flex-col items-center m-2  font-poppins" >
           <h1 className='pb-2 text-xl font-semibold xl:text-2xl'>No Products Found</h1>
           <p className='text-[14px] font-[430] xl:text-[15px]'>Looks like you haven't created any products,</p>
           <p className='text-[14px] font-[430] xl:text-[15px]'>Please create a porduct first</p>
        </div>
        </div>
       ):(
        <div className="h-auto mt-5 ">
        { products.map((products)=>(
            <div key={products.id} className="flex items-center justify-between h-24 p-6 px-2 py-1 mb-6 space-x-5 bg-white border rounded-lg shadow-md  sm:flex sm:justify-start 2xl:h-auto xl:h-32 xl:space-x-20">
            <div className="w-[35%] xl:w-[100%] p-2  ">
                <img className='w-full sm:w-40 h-[8vh]  object-cover rounded-xl border border-[#eee] drop-shadow-lg shadow-sm' src={products.productImage} alt="productImg" />
            </div>
            <div className="flex  space-x-3 xl:space-x-32 xl:pr-[23rem]">
            <h1 className='font-semibold xl:w-48 text-l-black'>{products.name}</h1>
            <h1 className='font-semibold xl:w-48 text-l-black'>₹ {products.price}</h1>
            <h1 className='hidden font-semibold xl:block xl:w-24 text-l-black'>In stock</h1>
            </div>
            <div className="flex   w-[30%]  justify-evenly h-10 items-center  xl:pr-24 xl:space-x-20  ">
            <NavLink to={`/EditProduct/${products.id}`}>
            <ImPencil className='bg-[#116dff] w-7 h-7 p-2     xl:w-9 xl:h-9 xl:p-2 text-[15px] font-bold flex  rounded-full cursor-pointer hover:scale-[1.04] ease-out duration-200  text-white'/>
            </NavLink>
            <FaTrashAlt onClick={()=>handleDelete(products.id)}  className=' bg-[#ff0000] w-7 h-7 p-2 xl:w-9 xl:h-9 xl:p-2 text-[10px] flex  rounded-full cursor-pointer hover:scale-[1.04] ease-out duration-200  text-white'/>
            </div>
            </div>
       ))}
        </div>
      )}
      </div>
    </>
    )
}

export default Product