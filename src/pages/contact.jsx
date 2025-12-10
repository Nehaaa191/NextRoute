import React, { useState } from 'react';

const Contact = () => {
const [showContactPopup, setShowContactPopup] = useState(false);
  const [showChatPopup, setShowChatPopup] = useState(false);

const closeAll = () => {
    setShowContactPopup(false);
    setShowChatPopup(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}>Get in Touch</h1>
      <p style={styles.subtitle}>How would you like to connect with us?</p>

      
      <div style={styles.buttonGroup}>
        
      <button 
          style={styles.mainButton} 
          onClick={() => setShowContactPopup(true)}
        >
          📞 Contact Us
        </button>

      
        <button 
          style={styles.mainButton} 
          onClick={() => setShowChatPopup(true)}
        >
          💬 Live Chat
        </button>
      </div>

      
      {showContactPopup && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <button style={styles.closeButton} onClick={closeAll}>×</button>
            <h2>Contact Details</h2>
            <div style={styles.infoRow}>
              <strong>Phone:</strong> +1 (555) 123-4567
            </div>
            <div style={styles.infoRow}>
              <strong>Email:</strong> support@travelapp.com
            </div>
            <button style={styles.actionButton} onClick={closeAll}>Done</button>
          </div>
        </div>
      )}

      
      {showChatPopup && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <button style={styles.closeButton} onClick={closeAll}>×</button>
            <h2>Live Assistance</h2>
            <div style={styles.iconContainer}>
              ⚠️
            </div>
            <h3>Under Development</h3>
            <p style={styles.text}>
              We are currently building our AI chat system to serve you better. 
              Please use the "Contact Us" button to call or email us for now!
            </p>
            <button style={styles.actionButton} onClick={closeAll}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
};


const styles = {
  container: {
    padding: '50px 20px',
    textAlign: 'center',
    minHeight: '60vh', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#666',
    marginBottom: '40px',
    fontSize: '1.2rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  mainButton: {
    padding: '15px 30px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.1s',
  },
  

  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'center',
    position: 'relative', 
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    animation: 'fadeIn 0.3s ease-in-out',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#aaa',
  },
  infoRow: {
    margin: '15px 0',
    fontSize: '1.1rem',
    color: '#333',
    textAlign: 'left',
    paddingLeft: '20px',
  },
  iconContainer: {
    fontSize: '3rem',
    margin: '10px 0',
  },
  text: {
    color: '#666',
    lineHeight: '1.5',
    marginBottom: '20px',
  },
  actionButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default Contact;