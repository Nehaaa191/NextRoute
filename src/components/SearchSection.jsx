import React, { useState } from 'react';
import './SearchSection.css';

const SearchSection = ({ onSearch }) => {
  
  const [formData, setFormData] = useState({
    destination: "",
    fromDate: "",
    toDate: "",
    people: 1
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    if (!formData.destination) {
      alert("Please enter a destination!");
      return;
    }
    
    onSearch(formData);
  };

  return (
    <div className="search-wrapper">
      <h2 className="text-white fw-bold mb-4" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
        Book Your Trip
      </h2>
      
      <div className="search-card">
        <div className="search-grid">
          
          
          <div className="input-group-box">
            <label>Destination</label>
            <input 
              type="text" 
              name="destination" 
              placeholder="Where to?" 
              value={formData.destination} 
              onChange={handleChange} 
            />
          </div>

         
          <div className="input-group-box">
            <label>From</label>
            <input 
              type="date" 
              name="fromDate" 
              value={formData.fromDate} 
              onChange={handleChange} 
            />
          </div>

         
          <div className="input-group-box">
            <label>To</label>
            <input 
              type="date" 
              name="toDate" 
              value={formData.toDate} 
              onChange={handleChange} 
            />
          </div>

          
          <div className="input-group-box">
            <label>People</label>
            <input 
              type="number" 
              name="people" 
              min="1" 
              value={formData.people} 
              onChange={handleChange} 
            />
          </div>

          
          <div className="button-box">
            <button className="find-btn" onClick={handleClick}>
              Find Packages
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SearchSection;