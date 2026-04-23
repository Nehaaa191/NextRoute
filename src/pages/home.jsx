import React, { useState } from 'react';
import Hero from '../components/Hero';
import MustVisit from '../components/MustVisit';
import SpecialOffers from '../components/SpecialOffers';
import Reviews from '../components/Reviews';
import SearchSection from '../components/SearchSection';
import PackageModal from '../components/PackageModal';
import BookingModal from '../components/BookingModal';
import SuccessPopup from '../components/SuccessPopup';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchData, setSearchData] = useState({ destination: '', fromDate: '', toDate: '', people: 1 });
  const [bookings, setBookings] = useState([]);

  const [offerModal, setOfferModal] = useState(null);
  const [successData, setSuccessData] = useState(null);

  // Must Visit package flow
  const [mustVisitModal, setMustVisitModal] = useState(null);
  const [mustVisitPackage, setMustVisitPackage] = useState(null);

  const handleSearch = (data) => {
    setSearchData(data);
    setShowModal(true);
  };

  const handleCardClick = (destinationName) => {
    setSearchData({ destination: destinationName, fromDate: '', toDate: '', people: 1 });
    setShowModal(true);
  };

  const handlePackageSelect = (pkg) => {
    const dateRange = (searchData.fromDate && searchData.toDate)
      ? `${searchData.fromDate} to ${searchData.toDate}`
      : new Date().toLocaleDateString();

    const newBooking = {
      name: 'Guest',
      destination: searchData.destination,
      date: dateRange,
      people: searchData.people,
      packageName: pkg.name,
      price: pkg.price,
    };

    setBookings([...bookings, newBooking]);
    setShowModal(false);
    setSuccessData({
      destination: searchData.destination,
      fromDate: searchData.fromDate || new Date().toLocaleDateString(),
      toDate: searchData.toDate || '',
      persons: searchData.people,
      packageName: pkg.name,
      price: pkg.price,
    });
  };

  // Must Visit: package selected -> open booking modal for person/date
  const handleMustVisitPackageSelect = (pkg) => {
    setMustVisitPackage(pkg);
    setShowModal(false);
    setOfferModal({
      name: mustVisitModal.name,
      price: pkg.price,
      priceNum: pkg.priceNum,
      nights: pkg.nights,
      details: pkg.name + ' — ' + pkg.features.join(', '),
      packageName: pkg.name,
    });
    setMustVisitModal(null);
  };

  const handleOfferBook = (bookingInfo) => {
    const totalPriceStr = `₹${bookingInfo.totalPrice.toLocaleString()}`;
    const dateStr = bookingInfo.toDate 
      ? `${bookingInfo.fromDate} to ${bookingInfo.toDate}` 
      : bookingInfo.fromDate;
    const newBooking = {
      name: 'Guest',
      destination: offerModal.place || offerModal.name,
      date: dateStr,
      people: bookingInfo.persons,
      packageName: offerModal.details || offerModal.packageName || 'Special Offer',
      price: totalPriceStr,
    };
    setBookings([...bookings, newBooking]);
    setOfferModal(null);
    setSuccessData({
      destination: offerModal.place || offerModal.name,
      fromDate: bookingInfo.fromDate,
      toDate: bookingInfo.toDate || '',
      persons: bookingInfo.persons,
      packageName: offerModal.details || offerModal.packageName || 'Special Offer',
      price: totalPriceStr,
    });
  };

  return (
    <div>
      <Hero />

      <div id="routes">
        <SearchSection onSearch={handleSearch} />
      </div>

      {bookings.length > 0 && (
        <div className="container mt-4 mb-5">
          <h2 className="text-center fw-bold mb-3">Your Upcoming Trips</h2>
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>Destination</th>
                  <th>Dates</th>
                  <th>People</th>
                  <th>Package</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, index) => (
                  <tr key={index}>
                    <td>{b.destination}</td>
                    <td>{b.date}</td>
                    <td>{b.people}</td>
                    <td>{b.packageName}</td>
                    <td className="text-success fw-bold">{b.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div id="must-visit">
        <MustVisit openBookingModal={(offer) => {
          setMustVisitModal(offer);
          setSearchData(prev => ({ ...prev, destination: offer.name }));
          setShowModal(true);
        }} />
      </div>

      <div style={{ marginTop: '0px', marginBottom: '0px' }}>
        <SpecialOffers openOfferModal={(offer) => setOfferModal({ ...offer, isSpecialOffer: true })} />
      </div>

      <div id="reviews">
        <Reviews />
      </div>

      {showModal && (
        <PackageModal
          destination={searchData.destination}
          onClose={() => { setShowModal(false); setMustVisitModal(null); }}
          onSelect={mustVisitModal ? handleMustVisitPackageSelect : handlePackageSelect}
        />
      )}

      {offerModal && (
        <BookingModal
          offer={offerModal}
          onClose={() => setOfferModal(null)}
          onSuccess={handleOfferBook}
        />
      )}

      {successData && (
        <SuccessPopup
          booking={successData}
          onClose={() => setSuccessData(null)}
        />
      )}
    </div>
  );
};

export default Home;