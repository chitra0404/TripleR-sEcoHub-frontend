// ConsumerLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';

import RecyclerNavbar from '../../AuthPages/Recycler/RecyclerNavbar';


const RecyclerLayout = () => {
  return (
    <div>
   
  
 <RecyclerNavbar/>
      <main style={{ marginTop: '60px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default RecyclerLayout;
