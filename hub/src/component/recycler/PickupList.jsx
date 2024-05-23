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
        const token = localStorage.getItem('loggedIn');
        const recyclerId = JSON.parse(atob(token.split('.')[1])).recyclerId;
        const response = await axios.get(`${Base_Url}/api/pickuprequests/${recyclerId}`);
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
      console.log("rate",pickupRequestId);

    
      await handlePayment(pickupRequestId, weight, newRate);
    } catch (error) {
      setError('Error updating rate');
      console.error(error);
    }
    setIsLoading(false);
  };

  const handlePayment = async (pickupRequestId, weight, rate) => {
    try {
      const token = localStorage.getItem('loggedIn');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const amount = weight * rate;
      const response = await axios.post(`${Base_Url}/api/createOrder`, { amount },config);
      const { id: orderId, currency } = response.data;

      const razorpayOptions = {
        key: 'rzp_test_Rak7JNwDPS3zsN', 
        amount: amount,
        currency: currency,
        name: 'Recycler',
        description: `Payment for pickup ${pickupRequestId}`,
        order_id: orderId,
        handler: async (response2) => {
          try {
            const verifyResponse = await axios.post(`${Base_Url}/api/verifyPayment`, {
              pickupRequestId,
              razorpayPaymentId: response2.razorpay_payment_id,
              razorpayOrderId: response2.razorpay_order_id,
              razorpaySignature: response2.razorpay_signature,
              amount
            },config);
            
            alert('Payment Successful');
          } catch (error) {
            console.error('Error verifying payment:', error);
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: userName,
          email: 'user@example.com', 
          contact: '8056777272', 
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
    <>
    <div
    className="text-white text-center d-flex align-items-center justify-content-center"
    style={{
      backgroundImage: 'url(https://t4.ftcdn.net/jpg/07/66/01/19/360_F_766011975_FGP3dxr1zJ79UxOTnDaqZT0MH4Elhinl.jpg)',
      backgroundSize: 'cover',
      width: '100%',
      minHeight: '300px',
    }}
  >
            <h2 className="display-4 font-weight-bolder text-light"style={{ fontWeight: '600' }}>Pickup</h2>

    
    </div>
    <div className="container">
  {isLoading && <p>Loading...</p>}
  {error && <p>{error}</p>}
  <div className="table-responsive">
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Consumer Name</th>
          <th>Address</th>
          <th>Phone Number</th>
          <th>Scraps</th>
          <th>Weight (kg)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {pickupRequests.map((item, index) => (
          <tr key={index}>
            <td>{item.user.name}</td>
            <td>{item.address}, {item.city}</td>
            <td>{item.othernumber}</td>
            <td>{item.items}</td>
            <td>{item.weight}</td>
            <td>
              {item.confirmed ? (
                <p>Pickup Confirmed!</p>
              ) : (
                <div>
                  <button className="btn btn-dark btn-sm" onClick={() => handleConfirmPickup(item._id)}>Confirm Pickup</button>
                  <br />
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    placeholder="Enter the rate"
                    value={item.newRate || ''}
                    onChange={(e) => setPickupRequests(pickupRequests.map((request) =>
                      request._id === item._id ? { ...request, newRate: e.target.value } : request
                    ))}
                    style={{ margin: '10px 0' }}
                  />
                  <button className="btn btn-primary btn-sm" onClick={() => handleManualUpdate(item._id, item.newRate, item.weight)}>Update Rate</button>
                  <button className="btn btn-success btn-sm" onClick={() => handlePayment(item._id, item.weight, item.rate)}>Pay for Pickup</button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
</>
  );
}

export default PickupList;
