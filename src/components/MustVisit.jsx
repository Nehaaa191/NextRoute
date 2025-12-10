import React, { useState, useRef, useEffect } from 'react'

import './MustVisit.css' 

const places = [
  { 
    id: 1, 
    name: "Goa Beach", 
    location: "Goa, India", 
    price: "₹15,000",
    desc: "Party capital.", 
    fullDetails: "Experience the vibrant nightlife, serene beaches, and delicious seafood.",
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80", 
      "https://plus.unsplash.com/premium_photo-1697730390320-8412ee5eae82?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z29hfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1587922546307-776227941871?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1642313281504-77925e214635?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGdvYXxlbnwwfHwwfHx8MA%3D%3D"
    ]
  },
  { 
    id: 2, 
    name: "Taj Mahal", 
    location: "Agra, India", 
    price: "₹5,000",
    desc: "Symbol of love.", 
    fullDetails: "Witness the breathtaking beauty of the Taj Mahal at sunrise.",
    images: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80", 
      "https://images.unsplash.com/photo-1519955266818-0231b63402bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGFncmF8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1576555697589-9fd80369de7a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1715167886555-01552c3369c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGFncmF8ZW58MHx8MHx8fDA%3D"
    ]
  },
  { 
    id: 3, 
    name: "Manali", 
    location: "Himachal", 
    price: "₹12,000",
    desc: "Snow mountains.", 
    fullDetails: "Paragliding, skiing, and trekking await you in the lap of Himalayas.",
    images: [
      "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbmFsaXxlbnwwfHwwfHx8MA%3D%3D", 
      "https://images.unsplash.com/photo-1516406742981-2b7d67ec4ae8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbmFsaXxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1626621331169-5f34be280ed9?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1571677465484-2dd540924245?q=80&w=1062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  { 
    id: 4, 
    name: "Kerala", 
    location: "South India", 
    price: "₹20,000",
    desc: "God's own country.", 
    fullDetails: "Relax in the houseboats of Alleppey and enjoy nature.",
    images: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80", 
      "https://plus.unsplash.com/premium_photo-1697729442042-c071ef0415b0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1691086683613-b5b218113329?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1661964426242-4e0b87e16bcd?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
];

const infinitePlaces = [...places, ...places, ...places, ...places];


const MustVisit = ({ openModal }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [activeImage, setActiveImage] = useState(""); 
  
  const sliderRef = useRef(null);
  const animationRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // --- AUTO SCROLL ---
  useEffect(() => {
    const slider = sliderRef.current;
    const autoScroll = () => {
      if (!isDown && slider) {
        slider.scrollLeft += 1;
        if (slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth)) {
           slider.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(autoScroll);
    };
    animationRef.current = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isDown]);


  const handleMouseDown = (e) => {
    setIsDown(true);
    sliderRef.current.classList.add('active');
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    cancelAnimationFrame(animationRef.current);
  };
  const handleMouseLeave = () => { setIsDown(false); sliderRef.current.classList.remove('active'); };
  const handleMouseUp = () => { setIsDown(false); sliderRef.current.classList.remove('active'); };
  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const openDetails = (place) => {
    if(!isDown) {
        setSelectedPlace(place);
        setActiveImage(place.images[0]);
    }
  }

  
  const handleBookClick = () => {
    if (selectedPlace) {
        openModal(selectedPlace.name); 
        setSelectedPlace(null); 
    }
  };

  return (
    <div className="py-5 bg-light">
      <div className="container mb-4">
        <h2 className="fw-bold display-5">🌟 Must Visit Destinations</h2>
        <p className="text-muted">Drag to explore. Click on a card to view details.</p>
      </div>

      
      <div 
        className="drag-container"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="drag-content">
          {infinitePlaces.map((place, index) => (
            <div 
              key={index} 
              className="place-card" 
              onClick={() => openDetails(place)}
            >
              <img src={place.images[0]} alt={place.name} draggable="false" />
              
              <div className="card-overlay">
                  <h3 className="card-title">{place.name}</h3>
                  <span className="card-location">📍 {place.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      {selectedPlace && (
        <div className="modal-overlay" onClick={() => setSelectedPlace(null)}>
          <div className="modal-content-box shadow-lg" onClick={(e) => e.stopPropagation()}>
            
            <button className="close-btn" onClick={() => setSelectedPlace(null)}>
                &times;
            </button>
            
           
            <div className="modal-gallery">
              <div className="main-image-wrapper">
                 <img src={activeImage} alt="Main" className="main-image" />
              </div>
              <div className="thumbnails-strip">
                {selectedPlace.images.map((img, idx) => (
                    <img 
                      key={idx} 
                      src={img} 
                      alt="thumb" 
                      onClick={() => setActiveImage(img)}
                      className={`thumb-img ${activeImage === img ? 'active' : ''}`}
                    />
                ))}
              </div>
            </div>

         
            <div className="modal-details">
              <div className="mb-auto">
                <span className="badge bg-warning text-dark mb-2 px-3 py-2 rounded-pill">⭐ Top Rated</span>
                <h1 className="fw-bold display-5 mb-2">{selectedPlace.name}</h1>
                <h5 className="text-secondary mb-4">📍 {selectedPlace.location}</h5>
                <p className="lead text-muted place-desc">{selectedPlace.fullDetails}</p>
              </div>
              
              <div className="mt-4 pt-4 border-top">
                 <div className="d-flex justify-content-between align-items-end mb-3">
                    <div>
                        <small className="text-muted text-uppercase fw-bold">Total Price</small>
                        <h2 className="text-success fw-bold m-0">{selectedPlace.price}</h2>
                    </div>
                 </div>

                
                 <button 
                    className="book-btn shadow-lg w-100 border-0" 
                    onClick={handleBookClick}
                 >
                   BOOK NOW
                 </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default MustVisit;