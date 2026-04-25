import React from 'react';
import './BookingModal.css';

export default function SuccessPopup({ booking, onClose }) {
  return (
    <div className="sp-overlay" onClick={onClose}>
      <div className="sp-box" onClick={e => e.stopPropagation()}>
        <div className="sp-icon">✓</div>
        <h2 className="sp-title">Booking Confirmed!</h2>
        <p className="sp-sub">Your trip to <strong style={{ color: '#FF8833' }}>{booking.destination}</strong> has been successfully booked.</p>

        <div className="sp-detail">
          <p>📅 <span>{booking.fromDate}</span> → <span>{booking.toDate}</span></p>
          <p>👥 <span>{booking.persons} {booking.persons === 1 ? 'Person' : 'Persons'}</span></p>
          {booking.packageName && <p>🎒 <span>{booking.packageName}</span></p>}
          {booking.price && <p>💰 <span>{booking.price}</span></p>}
        </div>

        <button className="sp-close-btn" onClick={onClose}>Done</button>
      </div>
    </div>
  );
}
