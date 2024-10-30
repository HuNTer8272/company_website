import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { IoIosSearch } from 'react-icons/io';
import { MdClose } from "react-icons/md";
import { FiShoppingCart, FiChevronDown } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from '../asset/Images/logo2.png';
import { NavLink, useLocation } from 'react-router-dom';
import { firestore } from '../Server/Firebase';
function Header({uid,updateSearch,isClicked}) {
  const userIcon = "https://i1.sndcdn.com/avatars-XVWpsyMy1ygP6eOp-7aNsDA-t500x500.jpg"
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(true);
  const [profileImage,setProfileImage]= useState(null);
  const [cartItemCount, setCartItemCount ]= useState(null);
  const toggleSidebar = () => {
    setIsHidden(!isHidden);
  };
  const isActiveLink = (path) => {
    return location.pathname === path ? 'bg-l-black text-white' : '';
  };
  const isActiveSidebarLink = (path) => {
    return location.pathname === path ? 'text-[16px] font-semibold hover:font-[550]' : '';
  };


  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: !isHidden ? 0 : 1 },
  });


  useEffect(() => {
    const fetchUser = async () => {
      const userRef = firestore.collection('users');
      const query = userRef.where('id', '==', uid).limit(1);
      const snapshot = await query.get();
      if (!snapshot.empty) {
        const userData = snapshot.docs[0].data();
        console.log(userData);
        setProfileImage(userData.photoURL);
        console.log(profileImage);
      }
    };
    fetchUser();
  }, [uid]);

  useEffect(() => {
    const cartRef = firestore.collection('Cart');
    const query = cartRef.where('uid', '==', uid);

    const unsubscribe = query.onSnapshot((snapshot) => {
      const count = snapshot.size;
      setCartItemCount(count);
    });

    return () => unsubscribe();
  }, [uid]);
  
  const handleSearchBarInput = (value)=>{
    updateSearch(value);
  }

  const handleKeyPress =(event)=>{
    if(event && event.key==="Enter" ){
      console.log("You pressed the enter key");
      isClicked(true);
    }else{
      isClicked(false)
    }
  }

  const handleRedirectToLoginPage =()=>{
    window.location.href = 'http://localhost:3000/';
  }

  return (
    <>
      <div className="fixed z-10 top-0 left-0 right-0 h-[90px] font-poppins  bg-eee border-b border-off-white border-2 border-solid  justify-between lg:justify-around xl:pr-14 flex  2xl:space-x-30 items-center px-3 py-4 md:pl-7 xl:pl-14 shadow-md ">
        <div className="flex  sm:space-x-3  xl:space-x-6">
          <img src={logo} alt="logo" className="w-[100px] h-[100px] xl:w-[120px] xl:h-[120px] " />
        </div>
        <ul className=' hidden lg:flex items-center   sm:space-x-5 md:space-x-9 lg:space-x-12 xl:space-x-20 2xl:space-x-28 '>
          <NavLink exact="true" to="/">
            <li className={` 2xl:p-2 2xl:px-5 lg:px-3 lg:py-1 xl:rounded-full xl:text-[15px]  rounded-full  cursor-pointer hover:text-white hover:bg-[#454440] ${isActiveLink('/')}`}>
              Home
            </li>
          </NavLink>
          <NavLink to="/Shop">
            <li className={`2xl:p-2 2xl:px-5 lg:p-1 lg:px-3 lg:py-1 xl:rounded-full xl:text-[15px]  lg:text-sm   rounded-full cursor-pointer ease-in-out duration-150 hover:bg-[#454440] hover:text-white ${isActiveLink('/Shop')}`}>
              Shop
            </li>
          </NavLink>
          <NavLink to="/About">
            <li className={`2xl:p-2 2xl:px-5 lg:px-3  xl:px-2 lg:py-1 xl:rounded-full xl:text-[15px]  lg:text-sm   rounded-full cursor-pointer ease-in-out duration-150 hover:bg-[#454440] hover:text-white ${isActiveLink('/About')}`}>
              About Us
            </li>
          </NavLink>
        </ul>
        <div className="flex  justify-center text-items-center relative pr-3 md:pr-8">
          <IoIosSearch className="absolute left-4 top-[13px] text-[17px] text-gray-600 z-10" />
          <input
            onChange={(e)=>handleSearchBarInput(e.target.value)}
            onKeyDown={handleKeyPress}
            type="text"
            placeholder="Search"
            className="p-2 pr-5 w-[200px]  md:w-[300px] xl:w-[300px] xl:h-[45px] text-gray-600 drop-shadow-lg line-clamp-1 outline-none focus:drop-shadow-cl duration-300 ease-in-out bg-off-white rounded-full pl-10  sm:w-36"
          />
        </div>
        {profileImage===null?(
          <div>
            <button onClick={handleRedirectToLoginPage} className='w-[40px] h-[40px] 2xl:w-[90px] 2xl:h-[40px] text-white text-sm rounded-3xl hover:opacity-[0.9]  bg-l-black'>Login</button>
          </div>
        ):(
          <div className="hidden   lg:flex  items-center  justify-center 2xl:space-x-3 relative">
          <div className="  w-[40px] h-[40px] 2xl:w-[50px] 2xl:h-[50px] flex  overflow-hidden rounded-full">
            <img src={profileImage} className='object-cover cursor-pointer' />
          </div>
          <FiChevronDown className=' cursor-pointer' />
        </div>
        )}
       
        <div className=" flex items-center justify-center relative  2xl:p-2 ">
          <NavLink to='/Cart'>
            <FiShoppingCart className='text-[30px] 2xl:text-3xl text-l-black cursor-pointer' />
          </NavLink>
          {isHidden && (
            <div className="absolute   cursor-pointer -right-5 top- bg-slate-600 w-[20px] h-[20px] 2xl:w-[20px] 2xl:h-[20px] flex items-center justify-center  text-center rounded-full">
              <p className='text-[10px] 2xl:text-[11px] text-white '>{cartItemCount}</p>
            </div>
          )}
        </div>
        {isHidden && (
          <div className="lg:hidden relative ml-5 flex justify-center items-center text-2xl w-9 h-9">
            <RxHamburgerMenu onClick={toggleSidebar} className='text-3xl absolute cursor-pointer' />
          </div>
        )}

        {!isHidden && (
          <div  className="fixed z-50 top-0 left-0 right-0 bottom-0  flex items-center justify-end p-2  -mr-2 ease-out duration-200">
            <div style={animation} className="bg-eee shadow-2xl h-screen w-64">
            <div className=" flex justify-end pr-3 mt-9 ">
            <MdClose onClick={toggleSidebar} className='text-3xl w-8 h-8 hover:bg-gray-700 text-white bg-l-black p-1 rounded-lg cursor-pointer' />
            </div>
              <div className=" flex  py-2 border pb-5 border-b-[#ccc] border-t-0  items-center space-x-2 justify-end pr-8 mt-8 2xl:space-x-3 relative">
                <div className="  w-[40px] h-[40px] 2xl:w-[50px] 2xl:h-[50px]   bg-black overflow-hidden rounded-full">
                  <img src={userIcon} className='object-cover cursor-pointer' />
                </div>
                <FiChevronDown className=' cursor-pointer' />
              </div>
              <div className="">
                <ul className=' '>
                  <NavLink exact="true" to='/' className={`flex w-full border border-b-[#ccc] border-t-0 py-3 pr-5 justify-end text-[15px] hover:text-[16px] hover:font-[450] duration-300 ease-in-out ${isActiveSidebarLink('/')} `}>
                    <li>Home</li>
                  </NavLink>
                  <NavLink to='/Shop' className={`flex w-full border border-b-[#ccc] border-t-0 py-3 pr-5 justify-end text-[15px] hover:text-[16px] hover:font-[450] duration-300 ease-in-out ${isActiveSidebarLink('/Shop')} `}>
                    <li>Shop</li>
                  </NavLink>
                  <NavLink to='/About' className={`flex w-full border border-b-[#ccc] border-t-0 py-3 pr-5 justify-end text-[15px] hover:text-[16px] hover:font-[450] duration-300 ease-in-out ${isActiveSidebarLink('/About')} `}>
                    <li>About Us</li>
                  </NavLink>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Header;