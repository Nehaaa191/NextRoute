import React from 'react';
import './WhatsAppWidget.css';

const WhatsAppWidget = () => {
  // Replace with your actual WhatsApp business number in production
  // Must include country code, e.g., 919999999999
  const phoneNumber = '1234567890'; 
  const message = encodeURIComponent('Hi NextRoute, I need some help planning my trip!');
  
  const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a 
      href={waUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-widget"
      aria-label="Chat with us on WhatsApp"
    >
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        alt="WhatsApp" 
        className="whatsapp-icon"
      />
    </a>
  );
};

export default WhatsAppWidget;
