import React from 'react'
import { useUserType } from '../../context/UserTypeContext';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const { handleLogout } = useUserType();
    const navigate = useNavigate();
    const handleLog = () => {
      handleLogout();
      navigate('/');
    };
  return (
    <div>
    <nav className="navbar fixed-top navbar-light p-2 text-white bg-white border-bottom border-3 border-danger">
      <div className="container-fluid">
        <div className="navbar-brand" style={{ textAlign: 'left' }}>
          <Link className="text-dark" to="/">
            <h1 className="fs-1 fst-italic text-danger"></h1>
          </Link>
        </div>

        <ul className="nav">
          <li className="nav-item nav1">
            <a className="nav-link  active " aria-current="page" href="#" style={{ textAlign: 'left' }}>
              <Link className="text-dark" to="/">
                <h5>Home</h5>
              </Link>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link  active" aria-current="page" href="#">
              <Link className="text-dark" to="/pickup">
                <h5>
                  RequestPickup
                </h5>
              </Link>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link  active" aria-current="page" href="#">
              <Link className="text-dark" to="">
                <h5>
                
                </h5>
              </Link>
            </a>
          </li>
          
          <a className="nav-link" href="#">
                <Link className="text-dark" to="/getprice">
                  <h5>
                    PriceList
                  </h5>
                </Link>
              </a>
          <li className="nav-item">
            
              <a className="nav-link" href="#">
                <Link className="text-dark"  onClick={handleLog}>
                  <h5>
                   Logout
                  </h5>
                </Link>
              </a>
          
         
          </li>
        </ul>
      </div>
    </nav>
  </div>
  )
}

export default Navbar