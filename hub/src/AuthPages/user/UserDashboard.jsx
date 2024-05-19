import React, { useEffect } from 'react'
import map from '../../assets/map.gif'
import poster from '../../assets/Postergif.gif'
import posterlight from '../../assets/Posterlightgif.gif'
import { useUserType } from '../../context/UserTypeContext';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const { isdark, setisdark } = useUserType();
  const fadeDuration = 1.5; // Duration of fade-in/fade-out animation in seconds

  useEffect(() => {
    // Fade in the component
    gsap.fromTo(
      "#searchposter",
      { opacity: 0 },
      {
        opacity: 1,
        duration: fadeDuration,
        ease: "Power3.easeInOut", // Optional easing function
      }
    );

    // Add cleanup when the component unmounts
    return () => {
      // Fade out the component
      gsap.fromTo(
        "#searchposter",
        { opacity: 1 },
        {
          opacity: 0,
          duration: fadeDuration,
          ease: "Power3.easeInOut", // Optional easing function
        }
      );
    };
  }, []);
  return (
    <div className="container mt-5 vw-100 position-relative" id="searchposter">
    <div className="position-absolute p-2 vw-100 h-100" style={{ opacity: 0.2,borderRadius: '50px'}}>
      <img
        src={map}
        alt="MAP"
        className="w-100 h-100 object-cover rounded shadow"
        style={{ maxHeight: '100vh' }}
      />
    </div>
    <div className="row  position-relative" style={{ zIndex: 10,borderRadius: '15px'  }}>
      <div className="col-md-6">
        <div className="card shadow rounded p-3 m-4">
          <h1 className="display-5 font-weight-bold">Welcome </h1>
          <p className=" lead">
            In an effort to combat the growing issue of electronic waste (e-waste), our project is dedicated to responsible recycling and disposal. We provide convenient drop-off locations for old electronics, ensuring they are recycled or refurbished, reducing environmental impact and promoting a sustainable future.
          </p>
          {/* <div className="mt-4 d-flex gap-3">
            <button
              className="btn btn-primary font-weight-bold"
              onClick={() => { navigate(`/explore`) }}
              style={{ transition: 'transform 0.3s' }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)' }
            >
              Start Recycling
            </button>
            <button
              className="btn btn-primary font-weight-bold"
              onClick={() => { navigate(`/search`) }}
              style={{ transition: 'transform 0.3s' }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)' }
            >
              Locate Facility
            </button>
          </div> */}
        </div>
      </div>
      <div className="col-md-6 mt-5 mb-2  d-none d-md-flex justify-content-end" style={{ opacity: 0.4 }}>
        <div className="w-100" style={{ maxHeight: '100vh', position: 'relative'}}>
          <img
            src={isdark ? poster : posterlight}
            alt="Poster"
            className="img-fluid rounded "
            style={{ height: '50vh', objectFit: 'cover', }}
          />
        </div>
      </div>
    </div>
  </div>

  )
}

export default UserDashboard