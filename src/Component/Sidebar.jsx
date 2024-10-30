import React, { useState, useEffect } from 'react';
import logo from "../assets/Images/logo2.png";
import "./Admin.css";
import { RxDashboard } from "react-icons/rx";
import { BsFillPersonFill } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { CiViewList } from "react-icons/ci";
import { NavLink, useLocation } from 'react-router-dom';
import { AiOutlineSetting, AiOutlinePlus } from "react-icons/ai";
import { HiMenuAlt2 } from "react-icons/hi"
import {BiCategoryAlt} from "react-icons/bi"
import { MdOutlineLogout, MdAutoGraph, MdOutlineMailOutline, MdOutlineMarkEmailRead, MdOutlineReport,  } from "react-icons/md";

function Sidebar() {
  const icon = () => {
    const className = "text-xl font-semibold";
    return className;
  };
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path ? 'active hover:translate-x-[0px] ' : '';
  };
  const isActiveLinkMobile = (path) => {
    return location.pathname === path ? 'active hover:translate-x-0 bg-[#7380ec]  text-white font-semobold  p-2 rounded-xl ' : '';
  };

  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isMobileView ? (
        <div className="flex flex-col items-center bg-eee shadow-lg h-screen w-[10vh]  fixed">
          <div className="bg-l-black flex items-center justify-center mt-6 rounded-xl h-10 text- w-10 p-1 ">
            <HiMenuAlt2 className='text-2xl text-white' />
          </div>
          <div className="mt-4">
            <img src={logo} alt="" />
          </div>
          <div className="">
            <div className="sidebar  p-5 max-w-full flex flex-col  space-y-24 py-7">
              <NavLink exact to="/" className={`${isActiveLinkMobile('/')}flex justify-center item-center hover:scale-105  ease-out duration-300`}>
                <RxDashboard className={`${icon()}  `} />
              </NavLink>
              {/* <NavLink to='/Category'  className={`${isActiveLinkMobile('/Category')}flex justify-center item-center hover:scale-105  ease-out duration-300`}>
                <BiCategoryAlt className={` ${icon()}`} />
              </NavLink> */}
              <NavLink to='/Product' className={`${isActiveLinkMobile('/Product')} hover:scale-105  ease-out duration-300 flex justify-center item-center `}>
                <CiViewList className={`${icon()} text-[25px]`} />
              </NavLink>
            
           <NavLink  className={`${isActiveLinkMobile('/Contact')}flex justify-center item-center hover:scale-105  ease-out duration-300`}>
                <MdOutlineLogout className={`${icon()}`} />
           </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="container bg-[#f6f6f9] fixed  w-64  pl-0">
            <aside>
              <div className="top  ">
                <div className="flex   items-center pr-2">
                  <img className='w-[60px] h-[60px] ' src={logo} alt="" />
                  <h2 className=' font-semibold text-l-black'> <span>Sagar an systems</span></h2>
                </div>
                <div className="close" id="close-btn">
                  <GrFormClose className={`${icon()}`} />
                </div>
              </div>
              <div className="sidebar ">

                <NavLink exact to="/" className={`${isActiveLink('/')} hover:translate-x-3`}>
                  <RxDashboard className={`${icon()}`} />
                  <h3>Dashboard</h3>
                </NavLink>

                {/* <NavLink to='/Category' className={`${isActiveLink('/Category')}hover:translate-x-3  ease-out duration-300`}>
                  <BiCategoryAlt className={` ${icon()}`} />
                  <h3>Categories</h3>
                 </NavLink> */}

                <NavLink to='/Product' className={`${isActiveLink('/Product')} hover:translate-x-3  ease-out duration-300`}>
                  <CiViewList className={`${icon()}`} />
                  <h3>Product</h3>
                </NavLink>

                {/* <NavLink to='/Analytics' className={`${isActiveLink('/Analytics')}hover:translate-x-3  ease-out duration-300`}>
                  <MdAutoGraph className={`${icon()}`} />
                  <h3>Analytics</h3>
                </NavLink>

                <NavLink to='/Analytics' className={`${isActiveLink('/Messa')}hover:translate-x-3  ease-out duration-300`}>
                  <MdOutlineMailOutline className={`${icon()}`} />
                  <h3>Messages</h3>
                  <span className="message-count">26</span>
                </NavLink> */}

                {/* <NavLink to='/Analytics' className={`${isActiveLink('/Analytics')}hover:translate-x-3  ease-out duration-300`}>
                  <MdOutlineMarkEmailRead className={`${icon()}`} />
                  <h3>Products</h3>
                </NavLink> */}

                {/* <NavLink to='/Analytics' className={`${isActiveLink('/Analytics')}hover:translate-x-3  ease-out duration-300`}>
                  <MdOutlineReport className={`${icon()}`} />
                  <h3>Reports</h3>
                </NavLink>

                <NavLink to='/Analytics' className={`${isActiveLink('/Analytics')}hover:translate-x-3  ease-out duration-300`}>
                  <AiOutlineSetting className={`${icon()}`} />
                  <h3>Settings</h3>
                </NavLink>

                <NavLink to='/Analytics' className={`${isActiveLink('/Analytics')}hover:translate-x-3  ease-out duration-300`}>
                  <AiOutlinePlus className={`${icon()}`} />
                  <h3>Add Products</h3>
                </NavLink> */}

                <NavLink to='/Analytics' className={`${isActiveLink('/Analytics')}hover:translate-x-3  ease-out duration-300`}>
                  <MdOutlineLogout className={`${icon()}`} />
                  <h3>Logout</h3>
                  </NavLink>
              </div>
            </aside>
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar;
