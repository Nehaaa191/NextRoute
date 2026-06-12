import React, { useEffect } from 'react'
import { onMessageListener } from './firebase'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'

import Home from './pages/home'
import About from './pages/about'
import WhatsAppWidget from './components/WhatsAppWidget'
import Contact from './pages/contact'
import Admin from './pages/Admin'

function App() {
  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        if (payload.data && payload.data.action === 'LOGOUT') {
          console.log("Received remote LOGOUT command!");
          localStorage.removeItem('nextroute_token');
          alert("You have been logged out because you reached the maximum number of devices.");
          window.location.reload();
          return;
        }

        // Here you could use a proper toast library. Using alert for simplicity.
        console.log("Received foreground message:", payload);
        alert(`Notification: ${payload.notification?.title}\n${payload.notification?.body}`);
      })
      .catch((err) => console.log('failed: ', err));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          
        
          <Route index element={<Home />} />
          
          
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin" element={<Admin />} />
  
          
          
          <Route path="*" element={<div style={{padding: '50px', textAlign: 'center'}}><h1>404</h1><p>Page Not Found</p></div>} />
        
        </Route>
      </Routes>
      <WhatsAppWidget />
    </BrowserRouter>
  )
}

export default App