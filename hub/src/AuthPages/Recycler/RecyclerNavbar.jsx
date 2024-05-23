import React, { useEffect } from 'react'
import logo from '../../assets/RRR.png'
import { useUserType } from '../../context/UserTypeContext';
import { Link, useNavigate } from 'react-router-dom';
import Toggle from '../../Toggle';

function RecyclerNavbar() {
  
    useEffect(() => {
      let lastScrollY = window.scrollY;
      const navbar = document.querySelector('.navbar');
  
      const handleScroll = () => {
        if (window.scrollY > lastScrollY) {
          // Scroll down
          navbar.style.top = '-60px'; // Adjust based on navbar height
        } else {
          // Scroll up
          navbar.style.top = '0';
        }
        lastScrollY = window.scrollY;
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
  return (
    <div>
    <nav className="navbar fixed-top  p-2 text-white  border-bottom border-3 " id='#searchposter'>
      <div className="container-fluid">
        <div className="navbar-brand" style={{ textAlign: 'left' }}>
          <Link className="text-dark" to="/recycler/dashboard">
          <img src={logo} alt=""></img> 
          </Link>
        </div>

        <ul className="nav">
          <li className="nav-item nav1">
            <a className="nav-link  active " aria-current="page" href="#" style={{ textAlign: 'left' }}>
              <Link className="text-dark" to="/recycler/dashboard">
                <h6 >Home</h6>
              </Link>
            </a>
          </li>
      
          <li className="nav-item nav1">
            <a className="nav-link  active " aria-current="page" href="#" style={{ textAlign: 'left' }}>
              <Link className="text-dark" to="/recycler/pickuplist">
                <h6 >Orders</h6>
              </Link>
            </a>
          </li>
         
          <li className="nav-item nav1">
            <a className="nav-link  active " aria-current="page" href="#" style={{ textAlign: 'left' }}>
              <Link className="text-dark" to="/recycler/query">
                <h6 >query</h6>
              </Link>
            </a>
          </li>
          
          <li className="nav-item nav1">
            <a className="nav-link  active " aria-current="page" href="#" style={{ textAlign: 'left' }}>
              <Link className="text-dark" to="/recycler/we-take">
                <h6 >wetake</h6>
              </Link>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link  active" aria-current="page" href="#">
              <Link className="text-dark" to="/recycler/getprice">
                <h6 >
                  priceList
                </h6>
              </Link>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link  active" aria-current="page" href="#">
              <Link className="text-dark" to="/recycler/profile">
                <h6 >
               profile
                </h6>
              </Link>
            </a>

          </li>
          
         
        
        
          <li><Toggle/></li>
        </ul>
      </div>
    </nav>
  </div>
  )
}

export default RecyclerNavbar