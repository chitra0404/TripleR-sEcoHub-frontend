import React, { useState } from 'react';
import LoginPa from './Loginpage';
import Login from './Recycler/Login';
import AdLogin from './admin/AdLogin';
import { Link } from 'react-router-dom';
import TypingEffect from './TypingEffect';
import Navbar from './user/Navbar';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('consumer');
  const [showRegistration, setShowRegistration] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
   
    setShowRegistration(false);
  };

  const handleToggleRegistration = () => {
    setShowRegistration(!showRegistration);
  };

  return (
    <section className="vw-100 vh-100 d-flex justify-content-center align-items-center" style={{backgroundImage:"url()" ,paddingRight: '60px'}}>
      <div className='row'>
        <div className="col-md-6 pt-5 "style={{}}>
          <div className=" d-flex justify-content-center align-items-center">
     
            <h5 className='fw-bold  pt-5'>
              <TypingEffect text="TripleR's EcoHub" colors={['green', 'blue', 'red']} />
              <br/>
              <br/>
              <span>Refuse what you do not need;</span>
              <br />
              <span>reduce what you do need;</span>
              <br />
              <span>reuse what you consume;</span>
              <br />
              <span>recycle what you cannot refuse, reduce, or reuse;</span>
              <br />
              <span>and rot (compost) the rest</span>
              <br/>
              <span><img src="https://benir-web-prod.s3.amazonaws.com/static/img-v2/Group%20829.png" className='img-fluid w-50 h-50'/></span>
            </h5>
           
          </div>
        </div>
        <div className="col-md-6  justify-content-center align-items-center ">
          <div className='container py-5 border-3'>
            
            <ul className="nav nav-tabs justify-content-center align-items-center">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'consumer' ? 'active text-dark' : ''}`}
                  onClick={() => handleTabChange('consumer')}
                >
                  Consumer
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'recycler' ? 'active text-dark' : ''}`}
                  onClick={() => handleTabChange('recycler')}
                >
                  Recycler
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'admin' ? 'active text-dark' :''}`}
                  onClick={() => handleTabChange('admin')}
                >
                  Admin
                </button>
              </li>
            </ul>
            <div className="tab-content mt-3">
              {activeTab === 'consumer' && (
                <div className="tab-pane fade show active">
                  <LoginPa showRegistration={showRegistration} />
                  <p></p>
                  <Link  onClick={handleToggleRegistration}>
                    {showRegistration ? 'Back to Login ' : ' Registration as User'}
                  </Link>
                </div>
              )}
              {activeTab === 'recycler' && (
                <div className="tab-pane fade show active">
                  <Login  />
                
                </div>
              )}
              {activeTab === 'admin' && (
                <div className="tab-pane fade show active">
                  <AdLogin />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
