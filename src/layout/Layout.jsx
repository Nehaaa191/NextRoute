import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 
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