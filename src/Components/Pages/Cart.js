import React, { useState } from 'react';
import empty from "../../asset/Images/emptyCart.png";
import { useEffect } from 'react';
import { firestore } from '../../Server/Firebase';
import { BsCloudLightning } from 'react-icons/bs';
import axios from 'axios';


function Cart({cartItems,uid}) {
  
const [products,setProducts]=useState([])
const [total,setTotal] = useState(0);


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


useEffect(() => {
  const fetchCartProducts = async () => {
    const cartRef = firestore.collection('Cart');
    const query = cartRef.where('uid', '==', uid);
    const unsubscribe = query.onSnapshot((snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  };

  fetchCartProducts();
}, []);

useEffect(() => {
  let totalAmt = 0;
  products.forEach((item) => {
    totalAmt += parseFloat(item.price);
  });
  setTotal(totalAmt);
}, [products]);


const handleQuantityRemove = async(item)=>{
  if(item.quantity>1){
    const ogPrice = item.price /item.quantity;
    const newQuantity = item.quantity-1;
    const newPrice = ogPrice * newQuantity;
    try{
       const cartRef = firestore.collection('Cart');
       const querySnapshot = cartRef
       .where('uid', '==', uid)
       .where('productId', '==', item.productId)
       .get();
       if(!querySnapshot.empty){
          const doc =(await querySnapshot).docs[0];
          await cartRef.doc(doc.id).update({
            quantity: newQuantity,
            price:newPrice,
          });
       }
    }catch(error){
       console.log(error.message)
    }
  }
}
const handleQuantityAdd = async(item)=>{
  if(item.quantity>=1){
    const ogPrice = item.price /item.quantity;
    const newQuantity = item.quantity+1;
    const newPrice = ogPrice * newQuantity;
    try{
       const cartRef = firestore.collection('Cart');
       const querySnapshot = cartRef
       .where('uid', '==', uid)
       .where('productId', '==', item.productId)
       .get();
       if(!querySnapshot.empty){
          const doc =(await querySnapshot).docs[0];
            console.log(doc.data());
          await cartRef.doc(doc.id).update({
            quantity: newQuantity,
            price:newPrice,
          });
       }
    }catch(error){
        console.log(error.message)
    }
  }
}

const handleQuantityChange =()=>{
}

const handleRemoveItem=async(item)=>{
  try{
    const cartRef = firestore.collection('Cart');
    const querySnapshot = cartRef
    .where('uid', '==', uid)
    .where('productId', '==', item.productId)
    .get();
    if(!querySnapshot.empty){
       const doc =(await querySnapshot).docs[0];
       const docRef = cartRef.doc(doc.id);
       docRef.delete();

      }
  }catch(error){
     console.log("An error occured",error.message);
  }

}

const handlePayment = async(e)=>{
    e.preventDefault();
    try{
        const response = await axios.post("http://localhost:7000/payment",{
          amount:parseFloat(total),
        });
        const responseData = response.data;
        if(responseData.success){
          let options ={
            key: "rzp_test_YWUMtLQcXW3gNY",
          amount: responseData.amount * 100,
          currency: "INR",
          order_id: responseData.order.id,
          }
          if (window.Razorpay) {
            let rzp1 = new window.Razorpay(options);
            rzp1.open();
          } else {
            console.error('Razorpay script not loaded.');
          }
        }else{
          console.error(responseData.message);
        }
    }catch(error){
       console.log("An error occured ",error.message);
    }
}

  return (
    <div className="bg-gray-100 py-32  pb-[23rem]">
      {products.length === 0 ? (
        <div className=" flex justify-center">
        <div className="-mt-4 lg:w-[120vh] h-[70vh] flex flex-col justify-center">
          <div className="bg flex justify-center items-center">
            <img src={empty} className="w-[100%] lg:w-[60%] object-cover h-[100%]" alt="photo" />
          </div>
          <div className="mt-5 flex flex-col px-7 justify-center items-center">
            <h1 className="text-[18px] xl:text-2xl font-[500] pb-3 ">Your Cart is empty</h1>
            <p className="text-[13px] xl:text-sm  ">looks like you have not added anything to your cart,</p>
            <p className="text-[13px] xl:text-sm ">Go ahead & explore our categories</p>
          </div>
        </div>
        </div>
      ) : (
        <>
          <h1 className="mb-10 text-center text-3xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center items-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {products.map((item) => (
                <div
                  key={item.productId}
                  className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                >
                  <img
                    src={item.productImage}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0  self-center">
                      <h2 className="text-lg font-bold text-gray-900 ">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6 self-center">
                      <div className="flex items-center border-gray-100">
                        <span onClick={()=>handleQuantityRemove(item)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-l-black hover:text-blue-50">
                          {' '}
                          -{' '}
                        </span>
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="number"
                          value={item.quantity}
                          min={1}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                        />
                        <span onClick={()=>handleQuantityAdd(item)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-l-black hover:text-blue-50">
                          {' '}
                          +{' '}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">₹{item.price}</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          onClick={() => handleRemoveItem(item)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 h-full self-start rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">
                ₹{total}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">₹100</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div>
                  <p className="mb-1 text-lg font-bold">
                  ₹{total+100} 
                  </p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <button onClick={handlePayment} className="mt-6 w-full rounded-md bg-l-black py-1.5 font-medium text-blue-50 hover:bg-[#313131]">
                Check out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}




export default Cart;