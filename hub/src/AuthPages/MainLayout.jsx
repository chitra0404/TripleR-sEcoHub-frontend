import React, { useState } from 'react';
import UserLogin from './user/UserLogin';
import Login from './Recycler/Login';
import AdLogin from './admin/AdLogin';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('consumer');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="vw-100 vh-100 d-flex justify-content-center align-items-center" style={{ backgroundImage: 'url(https://waster.com.au/wp-content/uploads/2020/03/how-to-invest-in-recycling-1032x675.jpg)', backgroundSize: 'cover', backgroundColor:"antiquewhite" }} >
      <div className='row'>
         <div className="col-md-6 pt-5 ">
         <div className=" d-flex justify-content-center align-items-center">
          <p className='fw-bold text-white pt-5'>Refuse what you do not need; reduce what you do need; 
            reuse what you consume; 
            recycle what you cannot refuse, reduce, or reuse;
             and rot (compost) the rest </p>
        </div>
        </div>
       <div className="col-md-6  justify-content-center align-items-center ">
        <div className='container py-5'>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'consumer' ? 'active text-dark' : 'text-light'}`}
                onClick={() => handleTabChange('consumer')}
              >
                Consumer
              </button>
              </li>
              <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'recycler' ? 'active text-dark' : 'text-light'}`}
                onClick={() => handleTabChange('recycler')}
              >
                Recycler
              </button>
              </li>
              <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'admin' ? 'active text-dark' : 'text-light'}`}
                onClick={() => handleTabChange('admin')}
              >
                Admin
              </button>
            </li>
          </ul>
          <div className="tab-content mt-3">
            
            {activeTab === 'consumer' && (
              <div className="tab-pane fade show active text-dark">
                <UserLogin />
              </div>
            )}
            {activeTab === 'recycler' && (
              <div className="tab-pane fade show active">
                <Login />
              </div>
            )}
            {activeTab === 'admin' && (
              <div className="tab-pane fade show active">
                <AdLogin />
              </div>
            )}
          </div>
          </div>
          </div></div>
    </section>
  );
};

export default LoginPage;
