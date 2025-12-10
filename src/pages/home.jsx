import React, { useState } from 'react';
import Hero from '../components/Hero';
import MustVisit from '../components/MustVisit';
import SpecialOffers from '../components/SpecialOffers';
import Reviews from '../components/Reviews';
import SearchSection from '../components/SearchSection'; 
import PackageModal from '../components/PackageModal';   

const Home = () => {
 
  const [showModal, setShowModal] = useState(false);
  const [searchData, setSearchData] = useState({ destination: "", fromDate: "", toDate: "", people: 1 });
  const [bookings, setBookings] = useState([]); 

  
  const handleSearch = (data) => {
    setSearchData(data); 
    setShowModal(true);
  };


  const handleCardClick = (destinationName) => {
    setSearchData({ 
      destination: destinationName, 
      fromDate: "", 
      toDate: "", 
      people: 1 
    });
    setShowModal(true);
  };


  const handlePackageSelect = (pkg) => {
    const dateRange = (searchData.fromDate && searchData.toDate) 
      ? `${searchData.fromDate} to ${searchData.toDate}`
      : new Date().toLocaleDateString();

    const newBooking = {
      name: "Guest",
      destination: searchData.destination,
      date: dateRange,
      people: searchData.people,
      packageName: pkg.name,
      price: pkg.price
    };

    setBookings([...bookings, newBooking]); 
    setShowModal(false); 
    alert(`Success! Booked ${pkg.name} for ${searchData.destination}`);
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
         <MustVisit openModal={handleCardClick} />
      </div>

      {/* --- SPECIAL OFFERS --- */}
      <div style={{marginTop: '0px', marginBottom: '0px'}}> 
          <SpecialOffers openModal={handleCardClick} />
      </div>

      <div id="reviews">
          <Reviews />
      </div>

      {showModal && (
        <PackageModal 
          destination={searchData.destination} 
          onClose={() => setShowModal(false)}
          onSelect={handlePackageSelect}
        />
      )}

    </div>
  )
}

export default Home;