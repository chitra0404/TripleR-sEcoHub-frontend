import React, { useEffect, useState } from 'react';
import { Base_Url } from '../../config/api';
import axios from 'axios';


function Pickup() {
  const [details, setDetails] = useState({
    user: '',
    category: '',
    city: '',
    state: '',
    address: '',
    othernumber: '',
    items: '',
    recycler: '',
  });
  const [recyclers, setRecyclers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
 

  useEffect(() => {
    const fetchRecyclers = async () => {
      try {
        const res = await axios.get(`${Base_Url}/api/getrecycler`);
        setRecyclers(res.data.message);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecyclers();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('loggedIn');
    if (token) {
      const { userId } = JSON.parse(atob(token.split('.')[1]));
      setDetails({ ...details, user: userId });
      console.log(userId);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('loggedIn');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("config",config)

      const response = await axios.post(`${Base_Url}/api/pickup`, details, config);
      console.log('response', response.data);

      setDetails({
        ...details,
        city: '',
        state: '',
        address: '',
        othernumber: '',
        items: '',
        recycler: '',
      });
    } catch (error) {
      console.error('Error scheduling pickup:', error);
      setError('Error scheduling pickup. Please try again.');
    }
  };

  return (
    <section
      className="vh-100 vw-100 pt-5 mt-5 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage:
          'url(https://wallpapercrafter.com/desktop1/611877-green-light-texture-wavy-darkish-backgrounds.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: 'antiquewhite',
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 offset-md-3">
            <h2 className="text-uppercase text-center mb-4">Pickup Schedule</h2>
            <form onSubmit={handleSubmit}>
              {/* Category radio buttons */}
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="category"
                  value={details.category.sell}
                  onChange={handleChange}
                  checked={details.category === 'sell'}
                />
                <label className="form-check-label" htmlFor="category">
                  Sell
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="category"
                  value={details.category.donate}
                  onChange={handleChange}
                  checked={details.category === 'donate'}
                />
                <label className="form-check-label" htmlFor="exampleRadios2">
                  Donate
                </label>
              </div>

              {/* City input */}
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

              {/* State input */}
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

              {/* Address textarea */}
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

              {/* Other number input */}
              
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

              {/* Items input */}
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

              {/* Recycler dropdown */}
              <select
                name="recycler"
                value={details.recycler}
                onChange={handleChange}
                className="form-select mb-2"
              >
                <option value="">Select Recycler</option>
                {recyclers.map((recycler) => (
                  <option key={recycler._id} value={recycler.recyclerId}>
                    {recycler.name}
                  </option>
                ))}
              </select>

              {/* Submit button */}
              <button
                type="submit"
                className="btn btn-dark btn-lg btn-block"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>

              {/* Error message */}
              {error && <p className="text-danger">{error}</p>}
            </form>
          </div>
        </div>
      </div>

    
    </section>
  );
}

export default Pickup;