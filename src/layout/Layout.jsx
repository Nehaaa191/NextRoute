import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar'; 
import Footer from '../components/footer'; 
import '../components/Navbar.css'; 

const Layout = () => {
  return (
    <div className="app-layout">
     
      <Navbar />

      
      <main style={{ minHeight: '80vh' }}>
        <Outlet />
      </main>

      
      <Footer />
    </div>
  );
};

export default Layout;