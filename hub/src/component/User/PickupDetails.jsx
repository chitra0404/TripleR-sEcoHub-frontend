import React from 'react';

function PickupDetails({ pickups }) {
  return (
    <div className='row pt-5'>

    {pickups.map((item, index) => (
      <div className="card " key={index} style={{ width: '50%' }}>
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">Address:{item.address}</p>
          <p className="card-text">pincode:{item.pincode}</p>
          <p className="card-text">state:{item.state}</p>
          <p className="card-text">Mobilenumber:{item.othernumber}</p>

          <p className="card-text"><strong>City:</strong> {item.city}</p>
          <p className="card-text"><strong>scrapItems:</strong> {item.items}</p>
          <p className="card-text"><strong>scrapweight:</strong> {item.weight}</p>

        </div>
      </div>
         ))}
      </div>
  )
}

export default PickupDetails;
