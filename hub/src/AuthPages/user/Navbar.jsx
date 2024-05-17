import React from 'react';
import { useUserType } from '../../context/UserTypeContext';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const { handleLogout, isdark, setisdark } = useUserType();
  const navigate = useNavigate();

  

  const handleLog = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar fixed-top p-2 text-white border-bottom border-3 border-danger">
        <div className="container-fluid">
          <div className="navbar-brand" style={{ textAlign: 'left' }}>
            <Link className="text-dark" to="/user/pincode">
              <h1 className="fs-1 fst-italic text-danger">dashboard</h1>
            </Link>
          </div>

          <ul className="nav">
            <li className="nav-item nav1">
              <a className="nav-link active" aria-current="page" href="#" style={{ textAlign: 'left' }}>
                <Link className="text-dark" to="/user/location">
                  <h6 className="text-dark">Home</h6>
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                <Link className="text-dark" to="/user/pickup">
                  <h6 className="text-dark">RequestPickup</h6>
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                <Link className="text-dark" to="">
                  <h6 className="text-dark">What we do</h6>
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                <Link className="text-dark" to="/user/we-take">
                  <h6 className="text-dark">What we Take</h6>
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <Link className="text-dark" to="/user/getprice">
                  <h6 className="text-dark">PriceList</h6>
                </Link>
              </a>
            </li>
            <li className="nav-item">
              
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <Link className="text-dark" onClick={handleLog}>
                  <h5 className="text-dark">Logout</h5>
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
