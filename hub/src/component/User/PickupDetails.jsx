import React from 'react';
import '../../Styles/pickupdetails.css';  // Make sure to create this CSS file

function PickupDetails({ pickups }) {
  return (
    <div className='pickup-container'>
      {pickups.map((item, index) => (
        <div className="card" key={index}>
          <div className="card-body bg-success">
         
            <div className="card-text-container">
              <div className="card-text">
                <strong>Name:</strong>
                <span>{item.name}</span>
              </div>
            
              <div className="card-text">
                <strong>Address:</strong>
                <span>{item.address}</span>
              </div>
           
            
              <div className="card-text">
                <strong>Mobileno:</strong>
                <span>{item.othernumber}</span>
              </div>
          
              <div className="card-text">
                <strong>Scraps:</strong>
                <span>{item.items}</span>
              </div>
              <div className="card-text">
                <strong>Weight:</strong>
                <span>{item.weight}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PickupDetails;
