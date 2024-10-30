import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import Cart from './Components/Pages/Cart.js';
import Home from './Components/Pages/Home.js'
import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate, Navigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Shop from './Components/Pages/Shop';
import About from './Components/Pages/About';
import ShoppingPage from './Components/Pages/ShoppingPage';
import { auth } from './Server/Firebase.js';
import { firestore } from './Server/Firebase.js';
import Search from './Components/Search';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [search,setSearch]=useState('');
  const [searchItems,setSearchItems]=useState([]);
  const [clicked , SetClicked] = useState(false);
  const [products,SetProducts] = useState([]);
  // const navigate = useNavigate();


  const [uid,setUid] = useState('');
  console.log(uid)
  const addToCart = (products) => {
    setCartItems([...cartItems, ...products]);
  };
  // const cartItemsCount = cartItems.length;
  //  const navigate = useNavigate();

  useEffect(()=>{
    const fetchProducts = async()=>{
      try{
         const productRef = firestore.collection('products');
         const snapShot= await productRef.get();
         const productData = snapShot.docs.map((doc)=>({
            id:doc.id,
            ...doc.data()
         }));
         SetProducts(productData);
      }catch(error){
        console.log(`An error occured while fetching the products ${error.message}`)
      }
     }
     fetchProducts();
   console.log(products)

  },[]);


  useEffect(() => {
  const userid = new URLSearchParams(window.location.search).get('uid');
  console.log(userid);
  setUid(userid);
  console.log(uid)
  }, []);

 
  const updateSearch =(newData)=>{
    console.log(`newData:${newData}`)
    setSearch(newData)
   }

  useEffect(()=>{
    console.log(search,"From app.js")
   
  },[search])

  useEffect(() => {
    if (clicked === true) {
      console.log("They have really clicked the enter key");
      const fetchSearchProducts = async () => {
        const filteredItems = products.filter((item) =>
          item.name.includes(search.toLowerCase())
        );
        setSearchItems(filteredItems);
        console.log("Search Items ", filteredItems);
        // navigate('/search');
      };
      fetchSearchProducts();
    }
  }, [clicked]);
  
  

  const isClicked =(clicked)=>{
    console.log(`clicked value that i got from the header ${clicked}`)
    SetClicked(clicked);
    console.log("Clicked Value:",clicked)
  }
  

  return (
    <Router>
      <>
        <HeaderWithToggle updateSearch={updateSearch} isClicked={isClicked} uid={uid} />
        {clicked === true ? (
          <>
             <Search searchItems={searchItems}/>
            {/* <Route path="/Search" element={<Search searchItems={searchItems} />} /> */}
          </>
        ) : (
          <>
        <Routes>
            <Route path="/" element={<Home uid={uid} />} />
            <Route path="/Shop" element={<Shop addToCart={addToCart} uid={uid} />} />
            <Route path="/ShoppingPage/:productId" element={<ShoppingPage uid={uid} />} />
            <Route path="/About" element={<About />} />
            <Route path="/Cart" element={<Cart cartItems={cartItems} uid={uid} />} />
          </Routes>
          </>
        )}
        <FooterWithToggle />
      </>
    </Router>
  );
}

function HeaderWithToggle({uid,updateSearch,isClicked}) {
  const location = useLocation();
  const [isHeaderVisible , setIsHeaderVisible] = useState(true);
  const isShoppingPageRoute = location.pathname === '/ShopppingPage';
  const handleToggleHeader = () => {
    setIsHeaderVisible(!isHeaderVisible);
  };
  
  return (
    <>
      {isShoppingPageRoute ? null : (
        <div>
          <Header  isClicked={isClicked} updateSearch={updateSearch} uid={uid} />
          <button onClick={handleToggleHeader}>
            ToggleHeader
          </button>
        </div>
      )}
    </>
  );
}

function FooterWithToggle() {
  const location = useLocation();
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const isShoppingPageRoute = location.pathname === "/ShoppingPage";
  const handleFooterToggle = () => {
    setIsFooterVisible(!isFooterVisible);
  };
  
  return (
    <>
      {isShoppingPageRoute ? null : (
        <Footer/>
      )}
    </>
  );
}

export default App;
