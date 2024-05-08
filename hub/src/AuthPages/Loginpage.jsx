import React from 'react';
import UserRegistration from '../AuthPages/user/UserRegisteration'
import UserLogin from './user/UserLogin';

const LoginPa = ({ showRegistration }) => {
  return (
    <div>
      {showRegistration ? (
        <div>
         <UserRegistration/>
                 </div>
      ) : (
        <div>
       <UserLogin/>
        </div>
      )}
    </div>
  );
};

export default LoginPa;
