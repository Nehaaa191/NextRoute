import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Hero.css"; 

export default function Hero() {
  return (
    <div className="hero-section">
      <div id="travelCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">

          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&h=1080&fit=crop"
              className="d-block w-100 hero-img"
              alt="India Gate"
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920&h=1080&fit=crop"
              className="d-block w-100 hero-img"
              alt="Taj Mahal"
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1080&fit=crop"
              className="d-block w-100 hero-img"
              alt="Goa Beach"
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
              className="d-block w-100 hero-img"
              alt="Mountain Trek"
            />
          </div>

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#travelCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#travelCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

     
      <div className="hero-text">
        <h1 className="site-title">Next Route</h1>
        <p className="site-subtitle">Discover the beauty, diversity, and culture like never before.</p>
      </div>
    </div>
  );
}