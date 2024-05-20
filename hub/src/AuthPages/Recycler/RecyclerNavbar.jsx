import React from 'react'
import logo from '../../assets/RRR.png'
import { useUserType } from '../../context/UserTypeContext';
import { Link, useNavigate } from 'react-router-dom';

function RecyclerNavbar() {
    const { handleLogout } = useUserType();
    const navigate = useNavigate();
    const handleLog = () => {
      handleLogout();
      navigate('/');
    };
  return (
    <div>
    <nav className="navbar fixed-top  p-2 text-white  border-bottom border-3 ">
      <div className="container-fluid">
        <div className="navbar-brand" style={{ textAlign: 'left' }}>
          <Link className="text-dark" to="/recycler/dashboard">
          <img src={logo} alt=""></img> 
          </Link>
        </div>

        <ul className="nav">
          <li className="nav-item nav1">
            <a className="nav-link  active " aria-current="page" href="#" style={{ textAlign: 'left' }}>
              <Link className="text-dark" to="/recycler/pickuplist">
                <h6 className="text-dark">Orders</h6>
              </Link>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link  active" aria-current="page" href="#">
              <Link className="text-dark" to="/recycler/re-register">
                <h6 className="text-dark">
                  Recycler
                </h6>
              </Link>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link  active" aria-current="page" href="#">
              <Link className="text-dark" to="">
                <h6 className="text-dark">
                What we do
                </h6>
              </Link>
            </a>

          </li>
          
          <li className="nav-item">
            <a className="nav-link  active" aria-current="page" href="#">
              <Link className="text-dark" to="">
                <h6 className="text-dark">
                What we Take
                </h6>
              </Link>
            </a>
          </li>
          
          <a className="nav-link" href="#">
                <Link className="text-dark" to="">
                  <h6 className="text-dark">
                    PriceList
                  </h6>
                </Link>
              </a>
          <li className="nav-item">
            
              <a className="nav-link" href="#">
                <Link className="text-dark"  onClick={handleLog}>
                  <h5 className="text-dark">
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

export default RecyclerNavbar