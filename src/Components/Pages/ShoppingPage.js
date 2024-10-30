import React,{ useEffect, useState } from 'react'
import {TiShoppingCart} from "react-icons/ti"
import { useParams } from 'react-router-dom'
import { firestore } from '../../Server/Firebase';
import axios from 'axios';
import "../../index.css"


function ShoppingPage({uid}) {
    const {productId} = useParams();
    const [product,setProduct] = useState([]);
    const [background,setBackgournd] = useState('')
    const handleButtonClick=()=>{
        setBackgournd('bg-black')
    }

    useEffect(() => {
        // When the component is mounted, set the scroll position to the top (0) with smooth behavior
        window.scrollTo({ top: 0, behavior: 'smooth' });
    
        // Clean up the scroll behavior when the component unmounts
        return () => {
          // Optionally, you can reset the scroll position to the top again when the component unmounts
          window.scrollTo({ top: 0, behavior: 'smooth' });
        };
      }, []);

    useEffect(() => {
        // Load the Razorpay script dynamically
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
      
        // Cleanup the script when the component unmounts
        return () => {
          document.body.removeChild(script);
        };
      }, []);

    useEffect(()=>{
      const fetchProduct = async()=>{
          const productRef = firestore.collection('products');
          const querySnapshot = productRef.where('id','==',productId).get();
          if(!querySnapshot.empty){
              const doc = (await querySnapshot).docs[0];
             const docData = doc.data();
             console.log(docData);
             setProduct(docData);
          }
      }
      fetchProduct();
    },[]);

    const handlePayment = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:7000/payment", {
            amount: parseFloat(parseFloat(product.price)),
          });
          const responseData = response.data;
          console.log(responseData);
          if (responseData.success) {
            let options = {
              key: "rzp_test_YWUMtLQcXW3gNY",
              amount: responseData.amount * 100,
              currency: "INR",
              order_id: responseData.order.id,
            };
            if (window.Razorpay) {
              let rzp1 = new window.Razorpay(options);
              rzp1.on('payment.success', async (paymentData) => {
                console.log("Payment Success", paymentData);
                
                // Add the data to the "order" collection in Firebase
                // const db = firebase.firestore();
                const orderRef = firestore.collection('order');
                await orderRef.add({
                  uid: uid,
                  productId: product.id,
                  productName: product.name,
                  quantity: product.quantity, 
                  price: product.price,
                  timestamp: Date.now.toString,
                });
        
                // You can handle additional actions after a successful payment here.
        
              });
              rzp1.open();
            } else {
              console.error('Razorpay script not loaded.');
            }
          } else {
            console.error(responseData.message);
          }
        } catch (error) {
          console.log("An error occurred ", error.message);
        }
      };
    return (
        <>
            <div className="pt-[5.8rem]  bg-gray-200 font-roboto flex xl:h-screen xl:w-screen  flex-col xl:flex-row p-10 space-y-[1px] xl:space-y-0  px-[auto] ">

                <div className=" xl:w-[100vh]  bg-l-black  xl:h-full rounded-t-md xl:rounded-l-md xl:rounded-tr-none overflow-hidden ">
                    {/* <h1>image</h1> */}
                    {/* <img className='w-full h-full  rounded-md object-cover cursor-pointer hover:scale-[1.002] ease-linear duration-200' src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" /> */}
                    <img className='w-full h-full  object-cover cursor-pointer hover:scale-[1.002] ease-linear duration-200' src={product.productImage} alt="" />
                </div>
                <div className=" info bg-eee shadow-xl p-5 pl-10 xl:w-[100vh] xl:rounded-bl-none   rounded-b-md xl:rounded-r-md overflow-hidden overflow-y-scroll  ">
                    <div className="">
                        <h1 className='uppercase text-xl xl:text-2xl font-semibold text-slate-800  pb-1'>{product.name}</h1>
                        <h1 className='font-semibold text-base xl:text-lg  text-l-black '>₹ {product.price}</h1>
                    </div>
                    <div className="">
                        <h1 className='uppercase font-poppins font-[550] text-l-black mt-10'>Description</h1>
                        {/* <p className='text-[13px] font-poppins mt-3 tracking-wide  leading-[1.5rem] '>Introducing the iconic Nike Air Max 270, where style meets unparalleled comfort. Step into a world of effortless cool with these cutting-edge sneakers that combine innovative design and superior cushioning. Engineered with a lightweight mesh upper and a bold, visible Air Max unit in the heel, these shoes deliver the perfect blend of fashion-forward aesthetics and responsive performance. Whether you're hitting the streets or pushing your limits at the gym, the Nike Air Max 270 is your ultimate companion, ensuring you stand out from the crowd with every step you take. Elevate your footwear game and experience the revolution of style and comfort with Nike Air Max 270.</p> */}
                        <p className='text-[13px] font-poppins mt-3 tracking-wide  leading-[1.5rem] '>{product.description}</p>
                    </div>
                    <div className="">
                        {/* <h1 className='font-poppins uppercase text-lg font-semibold mt-10'>Size</h1> */}
                        {/* <div className=" flex space-x-3 ">
                            {size.map((index) => (
                                <button onClick={handleButtonClick} className={`bg-slate-950 text-eee w-16 rounded-lg flex justify-center items-center mt-4 p-2 ${background}`} key={index}>
                                    {index}
                                </button>
                            ))}
                        </div> */}
                        <div className="mt-14 ml-4 ">
                            <button onClick={handlePayment} className='w-40 bg-l-black shadow-2xl text-white flex  items-center justify-center p-3 rounded-full m-auto xl:m-0'>
                                <TiShoppingCart className='mr-3'/>
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShoppingPage;