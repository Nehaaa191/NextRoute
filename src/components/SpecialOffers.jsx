import React, { useState } from "react";
import "./SpecialOffers.css";

const offers = [
  {
    id: 1,
    place: "Bali, Indonesia",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    details: "5 Nights • Hotel • Breakfast • City Tour",
    oldPrice: 54999,
    newPrice: 39999,
    side: "left"
  },
  {
    id: 2,
    place: "Paris, France",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    details: "4 Nights • Eiffel Entry • Cruise Dinner",
    oldPrice: 89999,
    newPrice: 69999,
    side: "center"
  },
  {
    id: 3,
    place: "Sen, Singapore",
    img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
    details: "3 Nights • Universal Studios • City Pass",
    oldPrice: 64999,
    newPrice: 49999,
    side: "right"
  }
];


export default function SpecialOffers({ openModal }) {
  const [hover, setHover] = useState(null);

  return (
    <div className="offers-container">
      <h2 className="title">SPECIAL OFFERS &#9992;</h2>

      <div className="offers-row">
        {offers.map((offer) => {
          const savings = offer.oldPrice - offer.newPrice;
          return (
            <div
              key={offer.id}
              className={`offer-card ${hover === offer.id ? "active" : ""} ${offer.side}`}
              onMouseEnter={() => setHover(offer.id)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="img-box">
                <img src={offer.img} alt="" />
                <h4 className="place">{offer.place}</h4>
              </div>

              <div className="details-box">
                <h3>{offer.place}</h3>
                <p>{offer.details}</p>

                <p className="old-price">₹{offer.oldPrice.toLocaleString()}</p>
                <p className="new-price">₹{offer.newPrice.toLocaleString()}</p>
                <p className="save">Save ₹{savings.toLocaleString()}!</p>
                <button 
                  className="book-btn"
                  onClick={() => openModal(offer.place)}
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}