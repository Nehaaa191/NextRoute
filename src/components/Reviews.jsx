import React from 'react';
import './Reviews.css';

const reviewsData = [
  {
    id: 1,
    name: "Ayush",
    rating: "⭐⭐⭐⭐⭐",
    text: "Booking my flights and hotels became so easy! The app shows the best prices and updates are super fast. Loved the smooth experience."
  },
  {
    id: 2,
    name: "Riya",
    rating: "⭐⭐⭐⭐",
    text: "The interface is very simple and clean. I planned my entire Goa trip within minutes. Highly recommended for all travelers!"
  },
  {
    id: 3,
    name: "Kunal",
    rating: "⭐⭐⭐⭐⭐",
    text: "This app always gives the cheapest deals compared to others. I saved almost ₹2,500 on my last trip to Manali. Worth using!"
  },
  {
    id: 4,
    name: "Sneha Patel",
    rating: "⭐⭐⭐⭐⭐",
    text: "I had an issue with my ticket timing but the support team solved it instantly. Very reliable app for family travels."
  },
  {
    id: 5,
    name: "Rohit Singh",
    rating: "⭐⭐⭐⭐",
    text: "The app loads quickly, payments are secure, and tracking bookings is effortless. Perfect for frequent travelers like me!"
  }
];

const Reviews = () => {
  return (
    <div className="reviews-section">
      <h2 className="text-center fw-bold display-5 mb-5">🗣️ What Travelers Say</h2>
      
      <div className="reviews-carousel">
      
        <div className="reviews-group">
          {reviewsData.map((review) => (
            <div className="review-card" key={review.id}>
              <h1>{review.name}</h1>
              <p className="stars">{review.rating}</p>
              <p className="review-text">“{review.text}”</p>
            </div>
          ))}
        </div>

       
        <div className="reviews-group" aria-hidden="true">
          {reviewsData.map((review) => (
            <div className="review-card" key={`dup-${review.id}`}>
              <h1>{review.name}</h1>
              <p className="stars">{review.rating}</p>
              <p className="review-text">“{review.text}”</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;