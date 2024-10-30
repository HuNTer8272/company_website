import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { firestore } from '../../Server/Firebase';

function Shop({uid}) {
  const [products,SetProducts]= useState([]);

  useEffect(() => {
    const productRef = firestore.collection('products');
  
    // Subscribe to real-time updates
    const unsubscribe = productRef.onSnapshot((snapshot) => {
      const productData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      SetProducts(productData);
    });
  
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  
  


  const handleAddToCart = async (product) => {
    try {
      const { id, ...rest } = product;
      const cartRef = firestore.collection('Cart');
      const querySnapshot = cartRef
      .where('uid', '==', uid)
      .where('productId', '==', product.id)
      .get();
      if (querySnapshot.size>0) {
        console.log("product there")
        // If the product exists in the cart, update the quantity and price
        const doc = (await querySnapshot).docs[0];
        const docData = doc.data();
        let newQuantity = docData.quantity + 1;
        let newPrice = docData.price * newQuantity;
        console.log(newPrice);
        console.log(newQuantity);
        console.log(docData)
        await cartRef.doc(doc.id).update({
          quantity: newQuantity,
          price: newPrice,
        });
      } else {
        console.log("creating a product")
        // If the product doesn't exist in the cart, add it
        const cartData = {
          uid: uid,
          productId: id,
          ...rest,
          quantity: 1,
          price: product.price,
        };
        console.log(cartData);
        await cartRef.add(cartData);
      }
    } catch (error) {
      console.log(`An error occurred: ${error}`);
    }
  };
  
  return (
    <>
   <section className=" pt-24 py-10   bg-gray-100 min-h-[97vh]">
       <div className=" flex items-center justify-center font-roboto text-2xl font-semibold mb-3 mt-5">
         <h1>Our Products</h1>
       </div>
        <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          


         {products.map((product)=>(
          
              <div key={product.id}>
                 <NavLink to={`/ShoppingPage/${product.id}`}>
                 <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
              <div className="relative flex items-end overflow-hidden rounded-xl">
                <img className='h-[180px] w-full object-cover' src={product.productImage} alt="Hotel Photo" />
              </div>
              <div className="mt-1 p-2">
                <h2 className="text-slate-700 font-semibold">{product.name}</h2>
                <div className="mt-3 flex items-end justify-between">
                  <p className="text-lg font-bold text-l-black">₹{product.price}</p>
                  <div className="flex items-center space-x-1.5 rounded-lg bg-l-black px-4 py-1.5 text-white duration-100 hover:bg-[#313131]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    <button className="text-sm" onClick={()=>handleAddToCart(product)}>Add to cart</button>
                  </div>
                </div>
              </div>
          </article>
                 </NavLink>
              </div>
            ))}
       
          
        </div></section>


</>
  )
}

export default Shop