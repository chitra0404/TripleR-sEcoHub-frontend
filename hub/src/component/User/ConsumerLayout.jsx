// ConsumerLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../AuthPages/user/Navbar';


const ConsumerLayout = () => {
  return (
    <div>
   
  
  <Navbar />
      <main style={{ marginTop: '60px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default ConsumerLayout;
