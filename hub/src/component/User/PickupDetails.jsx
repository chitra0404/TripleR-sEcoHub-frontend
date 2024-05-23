import React from 'react';
import '../../Styles/pickupdetails.css';  // Ensure this file exists and is correctly referenced

function PickupDetails({ pickups }) {
  return (
    <div className='container '>
      <div className='row'>
        {pickups.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}> {/* 'col-md-4' ensures 3 cards per row */}
            <div className="card shadow-md-6 rounded-lg">
              <div className="card-body">
                <div className="card-text-container">
                  <div className="card-row">
                    <strong>Name:</strong>
                    <span>{item.name}</span>
                  </div>
                  <div className="card-row">
                    <strong>Address:</strong>
                    <span>{item.address}</span>
                  </div>
                  <div className="card-row">
                    <strong>Mobileno:</strong>
                    <span>{item.othernumber}</span>
                  </div>
                  <div className="card-row">
                    <strong>Scraps:</strong>
                    <span>{item.items}</span>
                  </div>
                  <div className="card-row">
                    <strong>Weight:</strong>
                    <span>{item.weight}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PickupDetails;
