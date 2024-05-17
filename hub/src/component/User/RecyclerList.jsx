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
    <div>
     
      <div className=''  style={{ width: '50%' ,backgroundColor:"pu"}}>
        <input
          type="text"  
          placeholder="Enter pincode"
          value={pincode}
          onChange={handlePincodeChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className='row pt-5'>
       
        {recyclers.map((item, index) => (
          <div className="card " key={index} style={{ width: '50%' }}>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">Address:{item.address}</p>
              <p className="card-text">pincode:{item.pincode}</p>

              <p className="card-text"><strong>City:</strong> {item.city}</p>
              <p className="card-text"><strong>Available:</strong> {item.availability ? 'Yes' : 'No'}</p>
            </div>
          </div>
             ))}
          </div>
     
    </div>
  );
}

export default RecyclerList;
