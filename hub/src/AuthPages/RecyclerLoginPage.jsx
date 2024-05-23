import React from 'react';

import Register from './Recycler/Register';
import Login from './Recycler/Login';

const RecyclerLoginPage = ({ showRegistration }) => {
  return (
    <div>
      {showRegistration ? (
        <div>
         <Register/>
                 </div>
      ) : (
        <div>
       <Login/>
        </div>
      )}
    </div>
  );
};

export default RecyclerLoginPage;
