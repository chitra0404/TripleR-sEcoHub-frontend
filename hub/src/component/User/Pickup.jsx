import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Base_Url } from '../../config/api';
import PickupDetails from './PickupDetails';

function Pickup() {
  const [details, setDetails] = useState({
    user: '',
    category: '',
    city: '',
    state: '',
    address: '',
    othernumber: '',
    items: '',
    weight: '',
    recycler: '',
  });
  const [recyclers, setRecyclers] = useState([]);
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('schedule');

  useEffect(() => {
    const fetchRecyclers = async () => {
      try {
        const res = await axios.get(`${Base_Url}/api/getrecycler`);
    
        setRecyclers(res.data.message);
      } catch (err) {
        console.error('Error fetching recyclers:', err);
      }
    };
    fetchRecyclers();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('loggedIn');
    if (token) {
      const { userId } = JSON.parse(atob(token.split('.')[1]));
      setDetails((prevDetails) => ({ ...prevDetails, user: userId }));
    }
  }, []);

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const token = localStorage.getItem('loggedIn');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get(`${Base_Url}/api/pickuprequests`, config);
        setPickups(res.data.message);
      } catch (err) {
        console.error('Error fetching pickups:', err);
      }
    };
    fetchPickups();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('loggedIn');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${Base_Url}/api/pickup`, details, config);
      console.log('response', response.data);

      setDetails({
        user: details.user,
        category: '',
        city: '',
        state: '',
        address: '',
        othernumber: '',
        items: '',
        weight: '',
        recycler: '',
      });

      setPickups((prevPickups) => [...prevPickups, response.data]);
      setActiveTab('details');
    } catch (error) {
      console.error('Error scheduling pickup:', error);
      setError('Error scheduling pickup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => (
    <div className="col-12 col-md-6 shadow-lg pt-3 offset-md-3 rounded">
      <form onSubmit={handleSubmit}>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="category"
            value="sell"
            onChange={handleChange}
            checked={details.category === 'sell'}
          />
          <label className="form-check-label" htmlFor="category">
            Sell
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="category"
            value="donate"
            onChange={handleChange}
            checked={details.category === 'donate'}
          />
          <label className="form-check-label" htmlFor="exampleRadios2">
            Donate
          </label>
        </div>

        <div className="form-outline mb-2">
          <input
            type="text"
            name="city"
            className="form-control"
            placeholder="Enter city"
            value={details.city}
            onChange={handleChange}
          />
        </div>

        <div className="form-outline mb-2">
          <input
            type="text"
            name="state"
            className="form-control"
            placeholder="Enter state"
            value={details.state}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <textarea
            className="form-control"
            name="address"
            value={details.address}
            onChange={handleChange}
            rows="3"
            placeholder="Enter address"
          ></textarea>
        </div>

        <div className="form-outline mb-2">
          <input
            type="number"
            name="othernumber"
            className="form-control"
            placeholder="Enter mobile number"
            value={details.othernumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-outline mb-2">
          <input
            type="text"
            name="items"
            className="form-control"
            placeholder="Enter type of scrap"
            value={details.items}
            onChange={handleChange}
          />
        </div>

        <div className="form-outline mb-2">
          <input
            type="number"
            name="weight"
            className="form-control"
            placeholder="Enter weight of scrap in kg"
            value={details.weight}
            onChange={handleChange}
          />
        </div>

        <select
          name="recycler"
          value={details.recycler}
          onChange={handleChange}
          className="form-select mb-2"
        >
          <option value="">Select Recycler</option>
          {recyclers.map((recycler) => (
            <option key={recycler._id} value={recycler._id}>
              {recycler.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="btn btn-success btn-lg btn-block"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {error && <p className="text-danger">{error}</p>}
      </form>
    </div>
  );

  const renderDetails = () => (
    <div>
      <PickupDetails pickups={pickups} />
    </div>
  );

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
        <h2 className="display-4 font-weight-bolder text-light" style={{ fontWeight: '600' }}>
          Pickup
        </h2>
      </div>
      <section
        className="vh-100 vw-100 pt-3 mt-3 d-flex justify-content-center align-items-center"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul className="nav justify-content-center align-items-center">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'schedule' ? 'active' : ''}`}
                    onClick={() => setActiveTab('schedule')}
                  >
                    Pickup Schedule
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
                    onClick={() => setActiveTab('details')}
                  >
                    Pickup Details
                  </button>
                </li>
              </ul>
            </div>
            {activeTab === 'schedule' ? renderForm() : renderDetails()}
          </div>
        </div>
      </section>
    </>
  );
}

export default Pickup;
