import React from 'react';
import '../../Styles/pickupdetails.css';  // Make sure to create this CSS file

function PickupDetails({ pickups }) {
  return (
    <div className=' container  ' >
      <div className='row '>
      {pickups.map((item, index) => (
        <div className="col  card   shadow-md-6 rounded-lg mb-4" key={index}>
          <div className="card-body ">
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
      ))}
      </div>
    </div>
  );
}

export default PickupDetails;
