import React, { useState, useRef, useEffect } from 'react';
import { firestore,storage} from '../../../Server/Firbase';
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import { NavLink } from 'react-router-dom';
import './CreateProduct.css';
import { MdCurrencyRupee } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import imgIcon from "../assets/Images/addImg.png"
import bg from '../assets/Images/bg.jpg';
import more from '../assets/Images/more.png';

function CreateProduct() {
  

  const categories = ['Phones', 'Laptops', 'Shoes']; // catg array
  const [selectedCategory, setSelectedCategory] = useState(''); // for selected catg
  const [productName, setProductName] = useState(''); // entered product Name
  const [price, setPrice] = useState('');    // Entered Price
  const [catg, setCatg] = useState('');    // Entered catg
  const [description, setDescription] = useState(''); // Entered Desc 
  // const [url, seturl] = useState(null);  // Uploaded Img
  const [url,setUrl]= useState(null);
  const [imgSrc,setImgSrc]= useState(null);
  const dropRef = useRef(null);



  // Selecting catgs 
  const handleCheckboxChange = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(''); 
    } else {
      setSelectedCategory(category);
    }
  };

  //Css for buttons 
  const buttonCss = () => {
    const className =
      'text-white h-12 ml-5 border-2 font-bold w-24 hover:border-none  hover:bg-white hover:text-[#3899eb] ease-out duration-200';
    return className;
  };

  // For Dropping Image
  const handleDrop = (e) => {
    e.preventDefault();
    try{
      const file = e.dataTransfer.files[0];
      console.log(file);
      setImgSrc(file);
      console.log(imgSrc)
    }catch(error){
      console.log(`An error occured while trying the uplaod the image through drag and drop ${error.message}`);
    }

  };

  

  // For Drag and Drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // For removing the image 
  const handleImageContainerClick = () => {
    dropRef.current.click();
  };



 
const handleImageUpload = (e) => {
  try{
    const file = e.target.files[0];
    console.log(file);
    setImgSrc(file);
    console.log(imgSrc);
  }catch(error){
    console.log(`An error occured while uploading the image using the uploadImg function ${error.message}`)
  }

};

  
const handleSubmit = async () => {
  try {
    const file = imgSrc;
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2);
    const fileName = `products/${timestamp}_${randomString}_${file.name}`;
    const storageRef = ref(storage, fileName);

    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    const productsRef = firestore.collection('products');
    const productData = {
      description: description,
      category: catg.toLowerCase(),  
      price: price,
      productImage: imageUrl,
      name: productName,
      id: firestore.collection('products').doc().id,
    };

    await productsRef.add(productData);
    setProductName('');
    setUrl(null);
    setImgSrc(null)
    setDescription('');
    setPrice('');
    console.log("Product has been successfully created in Firebase");
  } catch (error) {
    console.log(`An error occurred while creating the product: ${error.message}`);
  }
};


  return (
    // header 
    <div className="font-poppin" >
      <header style={{ background: `url(${bg}) no-repeat center center / cover` }} className="top">
        <div className="in ml-10">
          <input
            className="text-2xl pb-1 pl-2"
            type="text"
            name="Pname"
            placeholder="Untitled Product"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <nav className="">
          <li>
            <ul>
              <button className={`more ${buttonCss()}`}>
                <img className="object-" src={more} alt="more" />
              </button>
            </ul>
            <NavLink to='/Product'>
            <ul>
              <button className={`cs ${buttonCss()}`}>Cancel</button>
            </ul>
            </NavLink>

            <ul>
              <button className={` ${buttonCss()}`} onClick={handleSubmit}>
                Save
              </button>
            </ul>
          </li>
        </nav>
      </header>

      {/* User Input Section */}
      <form>
        <div className="container ml-5 mt-5 font-poppins">
          <div className="lefttop h-[65vh]">
            <div className="border border-b-[#ccc] border-r-0 border-t-0 border-l-0 pb-3">
              <h2 className="imgtext p-3 text-2xl font-poppins font-[500] text-l-black">Images</h2>
            </div>
            <div className="" />
            <div className="flex justify-center items-center " >
              {imgSrc !== null? (
                <div
                  className="addimg relative flex justify-center h-[50vh] rounded-xl items-center"
                  style={{
                    background: `url(${URL.createObjectURL(imgSrc)}) no-repeat center center / cover`,
                    border: '1px solid #eee'
                  }}
                  onDragOver={handleDragOver}

                >
               
                    <div className="absolute w-full h-full bg-slate-950 rounded-xl pr-5 pt-4 text-white opacity-0 hover:opacity-[0.4] flex justify-end p-3 ">
                      <AiFillCloseCircle
                        onClick={() => setImgSrc(null)}
                        className="text-4xl hover:scale-[1.05] ease-in-out duration-150"
                      />
                    </div>
                  
                </div>
              ) : (
                <div
                  className="addimg flex justify-center h-[50vh] items-center"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={handleImageContainerClick}

                >
                  <input
                    type="file"
                    className="hidden"
                    ref={dropRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                  <img src={imgIcon} alt="" />
                  <h1 className="mt-5 mt">ADD IMAGES</h1>
                </div>
              )}
            </div>
          </div>
          <div className="product mb-5 h-[630px]">
            <h2 className="pinfo text-2xl p-3 font-[500] text-l-black font-poppins ">Product Info</h2>
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
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <div className="description text-lg font-poppins -mt-5 ">
              Description
              <input
                type="text"
                className="desc font-poppins text-[14px] h-[12vh] border-[#82bbea] focus:border-[#3899eb]"
                placeholder="Add a description to the product"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="description flex flex-col text-lg font-poppins mt-10 ">
              Category
              <div className="relative">
                {/* <MdCurrencyRupee className="absolute top-7 left-1 text-[#808080]" /> */}
                <input
                  type="text"
                  className="desc font-poppins mt-2  text-[14px] h-[5vh]  border-[#82bbea] focus:border-[#3899eb]"
                  placeholder="Add the category "
                  value={catg}
                  onChange={(e) => setCatg(e.target.value)}
                />
              </div>
            </div>
            <div className="description flex flex-col text-lg font-poppins mt-10 ">
              Price
              <div className="relative">
                <MdCurrencyRupee className="absolute top-7 left-1 text-[#808080]" />
                <input
                  type="text"
                  className="desc font-poppins mt-2 w-96 text-[14px] h-[5vh] pl-7 border-[#82bbea] focus:border-[#3899eb]"
                  placeholder="Add the price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
          </div>
          {/* <div className="categories absolute">
            <h2 className="ctext p-5 pb-4 text-2xl font-[500] font-poppins border-r-0 border-l-0 border border-t-0 border-b-[#ccc]">
              Categories
            </h2>
            {categories.map((category) => (
              <div key={category} className="flex items-center pt-9 ml-3">
                <input
                  className="w-5 h-5 peer outline border-none"
                  type="checkbox"
                  id={category}
                  checked={selectedCategory === category}
                  onChange={() => handleCheckboxChange(category)}
                />
                <label htmlFor={category} className="ml-2">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-10">
          <button
            className="btncreate text-white bg-indigo-500 font-poppins py-3 px-8 rounded-full focus:outline-none hover:bg-indigo-600"
            onClick={handleSubmit}
            // disabled={!productName || !price || !catg || !url}
          >
            Create Product
          </button>
        </div> */}
      </form>

    </div>
    
  );
}

export default CreateProduct;
