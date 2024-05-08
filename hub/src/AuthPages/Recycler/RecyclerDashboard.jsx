import React from 'react'
import { useUserType } from '../../context/UserTypeContext';
import { useNavigate } from 'react-router-dom';

function RecyclerDashboard() {
  const {handleLogout}=useUserType();
  const navigate=useNavigate();
  const handleLog = () => {
      handleLogout(); 
      navigate("/"); 
    };
  return (
    <div>RecyclerDashboard
      <button className="btn btn-primary" onClick={handleLog}>logout</button>

    </div>
  )
}

export default RecyclerDashboard