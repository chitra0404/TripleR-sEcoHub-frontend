import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Base_Url } from '../../config/api';



function PickupList() {
  const [pickupRequests, setPickupRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');


  useEffect(() => {
    const fetchPickupRequests = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${Base_Url}/api/pickuprequests`);
        setPickupRequests(response.data.message);
      } catch (error) {
        setError('Error fetching pickup requests');
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchPickupRequests();
    const token = localStorage.getItem('loggedIn');
    if (token) {
        const { name } = JSON.parse(atob(token.split('.')[1]));
      setUserName(name);
    }
  }, []);
  

  const handleConfirmPickup = async (pickupRequestId) => {
    setIsLoading(true);
    try {
        const token = localStorage.getItem('loggedIn');

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        console.log("config",config)
      const response = await axios.put(`${Base_Url}/api/pickuprequest/${pickupRequestId}/confirm`,null,config);
      const updatedPickupRequests = pickupRequests.map(pickupRequest => {
        if (pickupRequest._id === pickupRequestId) {
          return { ...pickupRequest, confirmed: true };
        }
        return pickupRequest;
      });
      setPickupRequests(updatedPickupRequests);
      console.log(response.data.message);
    } catch (error) {
      setError('Error confirming pickup request');
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
   
 <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
     
        {pickupRequests.map((item,index) => (
                            <div className="card" key={index} style={{ width: '50%', margin: '10px' }}>

<div className="card-body" >
<p className="card-text">Consumer Name: {userName}</p>
            <p className="card-title">City: {item.city}</p>
            <p className="card-text">Address: {item.address}</p>
            <p className="card-text">State: {item.state}</p>
            <p className="card-text">Phone Number: {item.othernumber}</p>
            <p className="card-text">Scrap Items: {item.items}</p>
              </div>
            {item.confirmed ? (
              <p>Pickup Confirmed!</p>
            ) : (
              <button onClick={() => handleConfirmPickup(item._id)}>Confirm Pickup</button>
            )}
          
          </div>
        ))}
      
    </div>
  );
}

export default PickupList;
