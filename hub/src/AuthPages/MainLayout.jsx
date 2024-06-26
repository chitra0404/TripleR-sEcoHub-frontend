import React, { useEffect, useState } from 'react';
import LoginPa from './Loginpage';
import Login from './Recycler/Login';
import AdLogin from './admin/AdLogin';
import { Link } from 'react-router-dom';
import TypingEffect from './TypingEffect';
import Navbar from './user/Navbar';
import gsap from "gsap";
import poster from '../assets/postdark.gif'
import posterlight from '../assets/post.gif'
import { useUserType } from '../context/UserTypeContext';
import RecyclerLoginPage from './RecyclerLoginPage';


const LoginPage = () => {
  const {isdark}=useUserType();
  const [activeTab, setActiveTab] = useState('consumer');
  const [showRegistration, setShowRegistration] = useState(false);
  useEffect(() => {
    gsap.fromTo(".auth", {x:400 , opacity : 0},{x : 0 , opacity: 100 , duration : 2 , ease : "power3.out" , stagger : 0.25});
  }, [activeTab])

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowRegistration(false);
  };

  const handleToggleRegistration = () => {
    setShowRegistration(!showRegistration);
  };

  return (
    <section className="vw-100 vh-100 d-flex justify-content-center align-items-center" style={{ backgroundImage: 'url()' }}>
      <div className='row'>
        <div className="col-md-6 pt-5">
          <div className="d-flex justify-content-center align-items-center">
            <h5 className='fw-bold pt-5'>
            
              <span><img src={isdark ? (poster) : (posterlight)} className='img-fluid w-50 h-50' /></span>
            </h5>
          </div>
        </div>
        <div className="auth col-md-6 d-flex justify-content-center align-items-center">
          <div className='container py-5 custom-border shadow'>
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
                  className={`nav-link ${activeTab === 'admin' ? 'active text-dark' : ''}`}
                  onClick={() => handleTabChange('admin')}
                >
                  Admin
                </button>
              </li>
            </ul>
            <div className="tab-content">
              {activeTab === 'consumer' && (
                <div className="tab-pane fade show active">
                  <LoginPa showRegistration={showRegistration} />
                  <p></p>
                  <Link onClick={handleToggleRegistration}>
                    {showRegistration ? 'Back to Login ' : ' Registration as User'}
                  </Link>
                </div>
              )}
              {activeTab === 'recycler' && (
                <div className="tab-pane fade show active">
                <RecyclerLoginPage showRegistration={showRegistration} />
                <p></p>
                <Link onClick={handleToggleRegistration}>
                  {showRegistration ? 'Back to Login ' : ' RecyclerRegistration '}
                </Link>
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
