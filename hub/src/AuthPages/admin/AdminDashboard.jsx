import React from 'react';
import { useUserType } from '../../context/UserTypeContext';
import { useNavigate } from 'react-router-dom';
import { CardList } from '../../chart/CardList';
import LineChart from '../../chart/LineChart';
import BarChart from '../../chart/BarChart';

function AdminDashboard() {
  const { handleLogout } = useUserType();
  const navigate = useNavigate();

  const handleLog = () => {
    handleLogout(); 
    navigate("/"); 
  };

  return (
    <div className="container-fluid pt-5">
      <div className="row">
        <h4 className='text-start'>Dashboard:</h4>
        <CardList />
      </div>
      <div className="row mt-4">
        <div className="col-lg-6 h-100">
        <h6 className="m-0 font-weight-bold text-start ">Traffic</h6>

          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex justify-content-between align-items-center">
             
            </div>
            <div>
              <div className="chart-area">
                <LineChart />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
        <h6 className="m-0 font-weight-bold text-start">Monthly and Yearly Pickups</h6>

          <div className="card shadow mb-4">
            <div className="card-header py-3">
            </div>
            <div className="card-body">
              <div className="chart-bar">
                <BarChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
