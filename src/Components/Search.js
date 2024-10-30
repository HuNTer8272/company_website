import React from 'react';
import {NavLink} from 'react-router-dom';
import notFound from "./../asset/Images/notFound.png";

function Search({ searchItems }) {
  return (
    <>
      <div className='py-24 bg-gray-100 min-h-[97vh] '>
        {searchItems.length === 0 ? (
          <div>
           <img className='w-[30%] h-[30%] m-auto  object-cover' src={notFound} alt="" />
          </div>
        ) : (
          <div className='px-10'>
            {searchItems.map((item) => (
              <NavLink to={`/ShoppingPage/${item.id}`} key={item.productId}>
                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <img
                    src={item.productImage}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0 self-center">
                      <h2 className="text-lg font-bold text-gray-900 ">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6 self-center">
                      <div className="flex items-center border-gray-100"></div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">₹{item.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
