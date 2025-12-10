import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const routesData = [
  { id: 1, name: "Paris, France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80", details: "4 Nights • Eiffel Entry", oldPrice: "₹89,999", newPrice: "₹69,999" },
  { id: 2, name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", details: "5 Nights • Beach Villa", oldPrice: "₹55,000", newPrice: "₹42,000" },
  { id: 3, name: "Dubai, UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea936a7fe5b?w=600&q=80", details: "3 Nights • Desert Safari", oldPrice: "₹45,000", newPrice: "₹35,000" }
];


const Routes = ({ openModal }) => {
  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold display-5 mb-5">✈️ Popular Routes</h2>
      <div className="row g-4 justify-content-center">
        {routesData.map((route) => (
          <div key={route.id} className="col-md-4">
            <div className="card h-100 shadow-lg border-0" style={{ borderRadius: "15px", overflow: "hidden" }}>
              <div style={{ position: "relative", height: "250px" }}>
                <img src={route.image} alt={route.name} className="w-100 h-100" style={{ objectFit: "cover" }} />
              </div>
              <div className="card-body p-4 text-center">
                <h3 className="fw-bold mb-2">{route.name}</h3>
                <p className="text-muted mb-3">{route.details}</p>
                <div className="d-flex justify-content-center gap-3 mb-4">
                   <h5 className="text-decoration-line-through text-muted">{route.oldPrice}</h5>
                   <h2 className="text-danger fw-bold">{route.newPrice}</h2>
                </div>
               
                <button 
                  className="btn btn-danger w-100 py-2 fw-bold" 
                  style={{ borderRadius: "50px" }}
                  onClick={() => openModal(route.name)} 
                >
                  View Packages
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Routes;