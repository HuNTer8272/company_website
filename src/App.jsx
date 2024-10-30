import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useParams } from 'react-router-dom';
import Sidebar from './Component/Sidebar';
import Dashboard from './Pages/Dashboard';
import Product from './Pages/Product';
import CreateProduct from './Pages/CreateProduct';
import Category from './Pages/Category.jsx';
import CreateCatg from './Pages/CreateCatg';
import EditProduct from './Pages/EditPage';

function App() {
  
  return (
    <Router>
      <SidebarWithToggle />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/CreateProduct" element={<CreateProduct />} />
        <Route path="/CreateCatg" element={<CreateCatg />} />
        <Route path="/EditProduct/:productId" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

function SidebarWithToggle() {
  const location = useLocation();
  const { productId } = useParams();
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const isCreateProductRoute = location.pathname === '/CreateProduct';
  const isEditProductRoute = location.pathname.includes('/EditProduct/');

  const handleToggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      {isCreateProductRoute || isEditProductRoute ? null : (
        <div>
          <Sidebar />
          <button onClick={handleToggleSidebar}>
            Toggle Sidebar
          </button>
        </div>
      )}
    </>
  );
}

export default App;
