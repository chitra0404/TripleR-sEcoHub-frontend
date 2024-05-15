// ConsumerLayout.js
import React from 'react';
import Navbar from '../../AuthPages/user/Navbar';
import PriceList from './PriceList';
import Pickup from './Pickup';

const ConsumerLayout = () => {
  return (
    <div>
      <Navbar />
  <Routes>
  <Route path="/getprice" element={<PriceList/>}/>
        <Route path="/pickup" element={<Pickup/>}/>
        
  </Routes>
    </div>
  );
};

export default ConsumerLayout;
