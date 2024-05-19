import React, { useEffect } from 'react';
import { useUserType } from '../../context/UserTypeContext';
import { Link, useNavigate } from 'react-router-dom';
import Toggle from '../../Toggle';
import logo from '../../assets/logo.jpg'
import { MdOutlineRecycling } from "react-icons/md";
import UserDashboard from './UserDashboard';
import '../../Styles/style.css'

function Navbar() {
  const { handleLogout, isdark, setisdark } = useUserType();
  const navigate = useNavigate();

  
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
    <div className=' shadow-bottom-3xl'>
     
      <nav className="navbar  fixed-top p-2 text-white  border-3 shadow-3xl shadow-bottom-3xl">
        <div className="container-fluid">
          <div className="navbar-brand" style={{ textAlign: 'center' }}>
            <Link className="text-dark" to ="/user/dashboard">
            <MdOutlineRecycling />   </Link>
          </div>
     
          <ul className="nav">
           
            <li className="nav-item nav1">
              <a className="nav-link active" aria-current="page" href="#" style={{ textAlign: 'left' }}>
                <Link className="text-dark" to="/user/location">
                  <h6 >Home</h6>
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                <Link className="text-dark" to="/user/pickup">
                  <h6 >Pickup</h6>
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                <Link className="text-dark" to="">
                  <h6 >Whatwedo</h6>
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                <Link className="text-dark" to="/user/we-take">
                  <h6 >WhatweTake</h6>
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <Link className="text-dark" to="/user/getprice">
                  <h6>PriceList</h6>
                </Link>
              </a>
            </li>
            <li className="nav-item nav1"><Toggle/></li>
            <li className="nav-item">
              
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <Link className="text-dark" to="/user/profile" >
                  <h6 >profile</h6>
                </Link>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
