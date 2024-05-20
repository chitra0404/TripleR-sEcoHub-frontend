// ConsumerLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdNavbar from '../../AuthPages/admin/AdNavbar';




const AdminLayout = () => {
  
  return (
    <div>
   
  
<AdNavbar/>
      <main style={{ marginTop: '60px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
