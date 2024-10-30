import { BsTwitter } from "react-icons/bs";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { IoLocation } from "react-icons/io5";

function Footer() {
  return (
    <div className="bg-l-black text-white min-h-[30vh] p-2 pt-5">
      <div className="flex items-center justify-between mb-5 px-3 xl:px-20">
        <h1 className="text-2xl xl:text-3xl font-semibold">Sagar and System</h1>
        <ul className="flex items-center justify-center space-x-9">
          <li className="bg-[#1771e6] h-[28px] w-[28px] flex items-center justify-center rounded-full cursor-pointer hover:scale-[1.1] duration-300 ease-in-out">
            <FaFacebookF className="text-white text-lg" />
          </li>
          <li className="bg-[#1c93e4] h-[28px] w-[28px] flex items-center justify-center rounded-full cursor-pointer hover:scale-[1.1] duration-300 ease-in-out">
            <BsTwitter className="text-white text-lg" />
          </li>
          <li className="bg-[#e90261] h-[28px] w-[28px] flex items-center justify-center rounded-full cursor-pointer hover:scale-[1.1] duration-300 ease-in-out">
            <FaInstagram className="text-white text-lg" />
          </li>
        </ul>
      </div>
      <div className="flex flex-wrap justify-around xl:justify-between xl:px-20">
        <div className="mb-8">
          <h1 className="relative text-white font-semibold text-lg pb-1 mb-4">
            Links
            <span className="absolute rounded-full bottom-0 left-0 w-[50%] h-[3px] bg-white"></span>
          </h1>
          <p className="text-white font-normal mb-1 text-[13px] xl:text-[15px] font-poppins">Home</p>
          <p className="text-white font-normal mb-1 text-[13px] xl:text-[15px] font-poppins">Shop</p>
          <p className="text-white font-normal mb-1 text-[13px] xl:text-[15px] font-poppins">About Us</p>
        </div>

        <div className="mb-8">
          <h1 className="relative text-white font-semibold text-lg pb-1 mb-4">
            Services
            <span className="absolute rounded-full bottom-0 left-0 w-[50%] h-[3px] bg-white"></span>
          </h1>
          <p className="text-white font-normal mb-1 text-[13px] xl:text-[15px] font-poppins">Home</p>
          <p className="text-white font-normal mb-1 text-[13px] xl:text-[15px] font-poppins">Shop</p>
          <p className="text-white font-normal mb-1 text-[13px] xl:text-[15px] font-poppins">About Us</p>
        </div>

        <div className="mb-8">
          <h1 className="relative text-white font-semibold text-lg pb-1 mb-4">
            Policy
            <span className="absolute rounded-full bottom-0 left-0 w-[50%] h-[3px] bg-white"></span>
          </h1>
          <p className="text-white font-normal mb-1 text-[13px] xl:text-[15px] font-poppins">Logistics</p>
          <p className="text-white font-normal mb-1 text-[13px] xl:text-[15px] font-poppins">Policies</p>
          <p className="text-white font-normal mb-1 text-[13px] xl:text-[15px] font-poppins">Transaction</p>
        </div>

        <div className="mb-8">
          <h1 className="relative text-white font-semibold text-lg pb-1 mb-4">
            Contacts
            <span className="absolute rounded-full bottom-0 left-0 w-[50%] h-[3px] bg-white"></span>
          </h1>
          <div className="text-white font-normal mb-1 text-[13px] xl:text-[15px] font-poppins flex items-center">
            <FiPhone className="mr-1" /> 99xxxxxxx
          </div>
          <div className="text-white font-normal mb-1 text-[13px] xl:text-[15px] font-poppins flex items-center">
            <MdOutlineMail className="mr-1" /> abc@gmail.com
          </div>
          <div className="text-white font-normal mb-1 text-[13px] xl:text-[15px] font-poppins flex items-center">
            <IoLocation className="mr-1" /> Byculla
          </div>
        </div>
      </div>
      <div className="mt-5 text-white text-[12px] xl:text-sm px-5 xl:px-20">
        <p className="flex items-center">
          © 2022 Sagar and System. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
