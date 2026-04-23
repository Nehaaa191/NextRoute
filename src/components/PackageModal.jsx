import React from 'react';
import './PackageModal.css';

const PackageModal = ({ destination, onClose, onSelect }) => {
  
  const packages = [
    { 
      id: 1,
      name: "Budget Explorer", 
      price: "₹15,000", 
      priceNum: 15000,
      nights: 3,
      color: "blue", 
      features: ["3 Nights Stay", "Sightseeing Tour", "Breakfast Included", "Airport Transfer"] 
    },
    { 
      id: 2,
      name: "Luxury Escape", 
      price: "₹35,000", 
      priceNum: 35000,
      nights: 5,
      color: "gold", 
      isPopular: true, 
      features: ["5 Nights in 5⭐ Hotel", "All Meals Included", "Private Guide", "Luxury Cruise Dinner", "Spa Session"] 
    },
    { 
      id: 3,
      name: "Adventure Pack", 
      price: "₹25,000", 
      priceNum: 25000,
      nights: 4,
      color: "orange", 
      features: ["4 Nights Camping", "Trekking & Hiking", "River Rafting", "Bonfire Night", "GoPro Recording"] 
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <div>
            <h3>Explore <span className="highlight-text">{destination}</span></h3>
            <p className="sub-text">Choose the perfect plan for your journey</p>
          </div>
          <button className="close-icon" onClick={onClose}>&times;</button>
        </div>
        
        <div className="packages-container">
          {packages.map((pkg, index) => (
            <div key={index} className={`pkg-card ${pkg.isPopular ? 'popular-card' : ''}`}>
              
         
              {pkg.isPopular && <div className="badge">MOST POPULAR</div>}

           
              <div className={`card-header ${pkg.color}`}>
                <h4 className="pkg-name">{pkg.name}</h4>
                <h2 className="pkg-price">{pkg.price}</h2>
                <p className="per-person">/ person</p>
              </div>

              <div className="card-body">
                <ul className="pkg-features">
                  {pkg.features.map((f, i) => (
                    <li key={i}>
                      <span className="check-icon">✔</span> {f}
                    </li>
                  ))}
                </ul>

                <button 
                  className={`select-btn ${pkg.color}-btn`}
                  onClick={() => onSelect(pkg)}
                >
                  Choose Plan
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PackageModal;