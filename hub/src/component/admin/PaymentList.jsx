import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Base_Url } from '../../config/api';
import '../../Styles/admin.css';  

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${Base_Url}/api/payment`); // Ensure this endpoint is correct
        setPayments(response.data);
        console.log(response.data);
      } catch (error) {
        setError('Error fetching payments');
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchPayments();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container vh-100 vw-100 justify-content-center mt-5 pt-2">
      <h2 className="bg-warning p-2 text-center">Payment Details</h2>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
        {/* Add any additional buttons or filters here */}
      </div>
      <table className="table table-hover border border-3 shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Payment ID</th>
            <th>Pickup Request ID</th>
            <th>Razorpay Order ID</th>
            <th>Razorpay Payment ID</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment._id}>
              <td>{payment._id}</td>
              <td>{payment.pickupRequestId}</td>
              <td>{payment.razorpayOrderId}</td>
              <td>{payment.razorpayPaymentId}</td>
              <td>{payment.amount}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;
