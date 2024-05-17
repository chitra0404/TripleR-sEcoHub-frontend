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
      const response = await axios.put(`${Base_Url}/api/pickuprequest/${pickupRequestId}/confirm`, null, config);
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

  const handleManualUpdate = async (pickupRequestId, newRate, weight) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('loggedIn');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`${Base_Url}/api/pickuprequest/${pickupRequestId}`, { rate: newRate }, config);
      const updatedPickupRequests = pickupRequests.map(pickupRequest => {
        if (pickupRequest._id === pickupRequestId) {
          return { ...pickupRequest, rate: newRate };
        }
        return pickupRequest;
      });
      setPickupRequests(updatedPickupRequests);
      console.log(response.data.message);

      // Trigger payment process
      await handlePayment(pickupRequestId, weight, newRate);
    } catch (error) {
      setError('Error updating rate');
      console.error(error);
    }
    setIsLoading(false);
  };

  const handlePayment = async (pickupRequestId, weight, rate) => {
    try {
      const amount = weight * rate;
      const response = await axios.post(`${Base_Url}/api/createOrder`, { amount });
      const { id: orderId, currency } = response.data;

      const razorpayOptions = {
        key: 'rzp_test_Rak7JNwDPS3zsN', // Replace with your Razorpay public key
        amount: amount,
        currency: currency,
        name: 'Recycler',
        description: `Payment for pickup ${pickupRequestId}`,
        order_id: response.data.id,
        handler: async (response2) => {
          try {
            const verifyResponse = await axios.post(`${Base_Url}/api/verifyPayment`, {
              pickupRequestId,
              razorpayPaymentId: response2.razorpay_payment_id,
              amount,
            });
            console.log("Verification Response:", verifyResponse.data);
            alert('Payment Successful');
          } catch (error) {
            console.error('Error verifying payment:', error);
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: 'chitra',
          email: 'chitras0404@gmail.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#61dafb',
        },
      };

      const rzp = new window.Razorpay(razorpayOptions);
      rzp.open();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error creating Razorpay order');
    }
  };

  return (
    <div className="container">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="row justify-content-center">
        {pickupRequests.map((item, index) => (
          <div className="col-md-4" key={index} style={{ marginBottom: '20px' }}>
            <div className="card" style={{ width: '100%' }}>
              <div className="card-body">
                <p className="card-text">Consumer Name: {userName}</p>
                <p className="card-title">City: {item.city}</p>
                <p className="card-text">Address: {item.address}</p>
                <p className="card-text">State: {item.state}</p>
                <p className="card-text">Phone Number: {item.othernumber}</p>
                <p className="card-text">Scrap Items: {item.items}</p>
                <p className="card-text">Weight: {item.weight} per kg</p>
              </div>
              {item.confirmed ? (
                <p>Pickup Confirmed!</p>
              ) : (
                <>
                  <button className="btn btn-dark btn-lg btn-block" onClick={() => handleConfirmPickup(item._id)}>Confirm Pickup</button>
                  <br />
                  <div>
                    <input type="number" className="form-control" min="0" placeholder="Enter the rate" value={item.newRate} onChange={(e) => setPickupRequests(pickupRequests.map((request) => request._id === item._id ? { ...request, newRate: e.target.value } : request))} />
                    <button className="btn btn-primary" onClick={() => handleManualUpdate(item._id, item.newRate, item.weight)}>Update Rate</button>
                    <button className="btn btn-success" onClick={() => handlePayment(item._id, item.weight, item.rate)}>Pay for Pickup</button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PickupList;
