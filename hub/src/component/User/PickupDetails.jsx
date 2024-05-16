import React from 'react';

function PickupDetails({ pickups }) {
  return (
    <div className="list-group">
      {pickups.map((pickup) => (
        <div key={pickup._id} className="list-group-item">
          <p><strong>Category:</strong> {pickup.category}</p>
          <p><strong>City:</strong> {pickup.city}</p>
          <p><strong>State:</strong> {pickup.state}</p>
          <p><strong>Address:</strong> {pickup.address}</p>
          <p><strong>Items:</strong> {pickup.items}</p>
          {/* <p><strong>Recycler:</strong> {pickup.recycler.name}</p> */}
          <p><strong>Status:</strong> {pickup.status}</p>
        </div>
      ))}
    </div>
  );
}

export default PickupDetails;
