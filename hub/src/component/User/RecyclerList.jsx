import React, { useState } from 'react';
import axios from 'axios';
import { Base_Url } from '../../config/api';

function RecyclerList() {
  const [pincode, setPincode] = useState('');
  const [recyclers, setRecyclers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    
    if (isNaN(pincode) || pincode.trim() === '') {
      setError('Pincode must be a number');
      setIsLoading(false);
      return;
    }


    console.log('Pincode:', pincode);

    try {
    
      const response = await axios.get(`${Base_Url}/api/getpincode`, {
        params: { pincode: pincode.trim() }
      });
      setRecyclers(response.data.recyclers);
    } catch (error) {
     
      setError(`Error fetching recyclers: ${error.message}`);
      console.error('Error details:', error);
    }

    setIsLoading(false);
  };

  return (
    <div className='vh-100'>
     
      <div className='container vw-100 py-6 '  style={{ height:"50%" ,backgroundImage:'url(https://previews.123rf.com/images/somchai999/somchai9992003/somchai999200300066/142294714-green-leaves-background-nature-green-leaf-wall-texture-of-the-tropical-forest-plant-on-black.jpg)'}}>
     
      <div className="search-container p-4  rounded" style={{  borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 className='text-white'>Search Recyclers</h2>
        <input
          type="text"
          placeholder="Enter pincode"
          value={pincode}
          onChange={handlePincodeChange}
          style={{  marginBottom: '10px', padding: '10px',alignItems: 'center' }}
        />
        <button onClick={handleSearch} className="btn btn-primary">Search</button>
      </div>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className='row pt-5' id='#card'>
       <h2 className='text-start'>Results:</h2>
        {recyclers.map((item, index) => (
          <div className="col-md-6" key={index}>
          <div className="card mb-4 shadow-md-6"  style={{ width: '70%' }}>
            <div className="card-body ">
              <p className="card-text text-start "><strong>Name:</strong><span className='text-start px-3'>{item.name}</span></p>
              <p className="card-text text-start"><strong>City:</strong><span className='text-start px-3'> {item.city}</span></p>
              <p className="card-text text-start"><strong>Address:</strong><span className='text-start px-3'>{item.address}</span></p>
             
              <p className="card-text text-start"><strong>pincode:</strong><span className='text-start px-3'>{item.pincode}</span></p>

              
              <p className="card-text text-start"><strong>Available:</strong><span className='text-start px-3'> {item.availability ? 'Yes' : 'No'}</span></p>
            </div>
          </div>
          </div>
             ))}
          </div>
   
    </div>
  );
}

export default RecyclerList;
