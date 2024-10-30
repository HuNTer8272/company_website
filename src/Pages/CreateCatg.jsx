import React, { useState, useRef } from 'react';
import './CreateCatg.css';
import bg from '../assets/Images/bg.jpg';
import imgIcon from '../assets/Images/addImg.png';
import more from '../assets/Images/more.png';
import { MdCurrencyRupee } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';
import axios from 'axios';


const categories = [
  'Phones',
  'Laptops',
  'Shoes',
  
];

function CreateCatg() {
 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const dropRef = useRef(null);

  const buttonCss = () => {
    const className =
      'text-white h-12 ml-5 border-2 font-bold w-24 hover:border-none  hover:bg-white hover:text-[#3899eb] ease-out duration-200';
    return className;
  };

  const mobileButtonCss = () => {
    const className =
      'text-[#c263ff]  border-gradient-to-r from-[#84f1ff] to-[#c263ff] flex justify-center items-center border-[#84f1ff]  h-12 ml-5 border-2 font-bold w-24 hover:border-none  hover:bg-white hover:text-[#3899eb] ease-out duration-200';
    return className;
  };

  const handleCheckboxChange = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const compressedImage = imageCompression.compress(event.target.result);
      const base64Image = compressedImage.toString('base64');
      setImageSrc(base64Image);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleImageContainerClick = () => {
    dropRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const compressedImage = imageCompression.compress(event.target.result);
      const base64Image = compressedImage.toString('base64');
      setImageSrc(base64Image);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageSrc(null);
  };

  const handleSubmit = () => {
    const productData = {
      Name: 'Product Name', // Replace with the actual product name
      Price: 100, // Replace with the actual price
      Description: 'Product description', // Replace with the actual description
      img: imageSrc, // Include the base64-encoded image string
      category: selectedCategory,
    };

    // Send the product data to the backend endpoint
    axios
      .post('http://localhost:4000/product/create', productData)
      .then((response) => {
        console.log('Product created successfully');
        // Perform any additional actions or redirect as needed
      })
      .catch((error) => {
        console.error('An error occurred while creating the product', error);
        // Handle the error
      });
  };

  return (
    <div className="font-poppin">
    
      <header style={{ background: `url(${bg}) no-repeat center center / cover` }} className="top">
        <div className="in ml-10">
          <input className="text-2xl pb-1 pl-2" type="text" name="Pname" placeholder="Untitled Product" />
        </div>
        <nav className="">
          <li>
            <ul>
              <button className={`more ${buttonCss()}`}>
                <img className="object-" src={more} alt="more" />
              </button>
            </ul>
            <ul>
              <button className={`cs ${buttonCss()}`}>Cancel</button>
            </ul>
            <ul>
              <button className={` ${buttonCss()}`} onClick={handleSubmit}>
                Save
              </button>
            </ul>
          </li>
        </nav>
      </header>
      <div className="container ml-5  mt-5 font-poppins">
        <div className="lefttop h-[65vh]">
          <div className=" border border-b-[#ccc]  border-r-0 border-t-0 border-l-0 pb-3">
            <h2 className="imgtext p-3 text-2xl font-poppins font-[500] text-l-black">Images</h2>
          </div>
          <div className="" />
          <div className="flex justify-center items-center ">
            {imageSrc ? (
              <div
                className="addimg relative flex justify-center h-[50vh] rounded-xl  items-center"
                style={{
                  background: `url(${imageSrc}) no-repeat center center /cover `,
                  border: '1px solid #eee'
                }}
                onDragOver={handleDragOver}
              >
                {imageSrc && (
                  <div className=" absolute w-full h-full bg-slate-950 rounded-xl pr-5 pt-4 text-white opacity-0  hover:opacity-[0.4] flex justify-end p-3 ">
                    <AiFillCloseCircle
                      onClick={handleRemoveImage}
                      className="text-4xl  hover:scale-[1.05] ease-in-out duration-150"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div
                className="addimg flex justify-center h-[50vh]  items-center"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={handleImageContainerClick}
              >
                <input type="file" className="hidden" ref={dropRef} onChange={handleImageUpload} accept="image/*" />
                <img src={imgIcon} alt="" />
                <h1 className="mt-5 mt">ADD IMAGES</h1>
              </div>
            )}
          </div>
        </div>
        <div className="product mb-3 h-[300px]">
          <h2 className="pinfo text-2xl p-3 font-[500] text-l-black font-poppins ">Category Info</h2>
          <div className="o" />
          <div className="name text-lg font-poppins">
            <h1 className="pb-9 -mt-5">Basic Info</h1>
            Name
          </div>
          <input
            type="text"
            className="pinput font-poppins text-[14px] border-[#82bbea] focus:border-[#3899eb]"
            name="namep"
            placeholder="Add a product name"
          />
          {/* <div className="description text-lg font-poppins -mt-5 ">
            Description
            <input
              type="text"
              className="desc font-poppins  text-[14px] h-[12vh]  border-[#82bbea] focus:border-[#3899eb]"
              placeholder="Add a description to the product"
            />
          </div>
          <div className="description  flex flex-col  text-lg font-poppins mt-10 ">
            Price
            <div className="relative">
              <MdCurrencyRupee className="absolute top-7 left-1 text-[#808080]" />
              <input
                type="text"
                className="desc font-poppins mt-2 w-96 text-[14px] h-[5vh] pl-7   border-[#82bbea] focus:border-[#3899eb]"
                placeholder="Add the price"
              />
            </div> */}
          {/* </div> */}
        </div>
        {/* <div className="categories absolute    ">
          <h2 className="ctext p-5 pb-4 text-2xl font-[500] font-poppins border-r-0 border-l-0 border border-t-0 border-b-[#ccc]">
            Categories
          </h2>
          {categories.map((category, index) => (
            <div key={index} className="flex items-center pt-9 ml-3">
              <input
                className="w-5 h-5 peer outline border-none"
                type="checkbox"
                id={category}
                checked={selectedCategory === category}
                onChange={() => handleCheckboxChange(category)}
              />
              <label htmlFor={category}>{category}</label>
              <br />
            </div>
          ))}
        </div> */}
      </div>
      <nav className="hidden navButton z-50 mt-60">
        <ul className="flex items-center justify-center">
          <li>
            <button className={` ${mobileButtonCss()}`}>
              {' '}
              <img className="w-[60%] h-[90%] object-cover" src={more} alt="more" />
            </button>
          </li>
          <li>
            <button className={` ${mobileButtonCss()}`}> Cancel</button>
          </li>
          <li>
            <button className={` ${mobileButtonCss()}`}> Save</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default CreateCatg;
