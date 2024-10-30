import React, { useEffect, useState } from 'react'
import "./Product.css";
import { BsDot } from "react-icons/bs";
import { firestore } from '../Server/Firebase';
import { NavLink } from 'react-router-dom';


function Products({uid}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productRef = firestore.collection('products');
  
    // Subscribe to real-time updates
    const unsubscribe = productRef.onSnapshot((snapshot) => {
      const productData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productData);
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
        // If the product doesn't exist in the cart, add it
        const cartData = {
          uid: uid,
          productId: id,
          ...rest,
          quantity: 1,
          price: product.price,
        };
        await cartRef.add(cartData);
      }
    } catch (error) {
      console.log(`An error occurred: ${error}`);
    }
  };
  

  return (
    <>
      <div className=" flex justify-center items-center font-bold font-roboto text-3xl text-l-black mt-20 mb-10  ">
        <h1>Our Products</h1>
      </div>
      <div className="container w-[85vw]  m-auto mb-12 xl:m-0  10   xl:w-[90vw]   justify-center  xl:justify-around bg-[#f5f5f5] py-10 gap-5 xl:gap-1  px-10 xl:mx-20 rounded-[15px] xl:mb-12  ">
        {products.slice(0, 4).map((product) => (
          <NavLink to={`/ShoppingPage/${product.id}`}>
          <div key={product.id} className="cards hover:-translate-y-2 ease-in-out duration-200">
            <div className="card-img pt-2">
              <img src={product.productImage} alt="" />
            </div>
            <div className="card-info -mt-7">
              <div className="card-title ">{product.name}</div>
              <div className="price ">MRP ${product.price} (Inc. of all taxes)</div>
              <div className="flex w-32 mt-6 m-auto items-center space-x-1.5 rounded-lg bg-l-black px-4 py-1.5 text-white duration-100 hover:bg-[#313131] ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <button className="text-sm " onClick={() => handleAddToCart(product)}>Add to cart</button>
              </div>
            </div>
          </div>
          </NavLink>

        ))}
      </div>
    </>
  )
}

export default Products