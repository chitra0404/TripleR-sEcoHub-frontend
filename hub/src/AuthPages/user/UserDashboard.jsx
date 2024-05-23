import React, { useEffect } from 'react';
import map from '../../assets/bg.jpg';
import poster from '../../assets/Postergif.gif';
import posterlight from '../../assets/Posterlightgif.gif';
import { useUserType } from '../../context/UserTypeContext';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import AboutUs from '../../component/AboutUs';
import { ScrollTrigger } from 'gsap/all';
import { Draggable } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);


function UserDashboard() {
  const { isdark, setisdark } = useUserType();
  const fadeDuration = 1.5; // Duration of fade-in/fade-out animation in seconds

  useEffect(() => {
    // Fade in the component
    gsap.fromTo(
      '#searchposter',
      { opacity: 0 },
      {
        opacity: 1,
        duration: fadeDuration,
        ease: 'Power3.easeInOut', // Optional easing function
      }
    );

    // Add cleanup when the component unmounts
    return () => {
      gsap.fromTo(".card", {y:100 , opacity : 0},{
        scrollTrigger: {
          trigger: ".card",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",// Optional: Adds visual markers for testing/debugging
        },
        opacity: 100,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger : 0.25
      });

      gsap.fromTo(".auth", {x:400 , opacity : 0},{x : 0 , opacity: 100 , duration : 2 , ease : "power3.out" , stagger : 0.25});

      
      gsap.fromTo(".nav" , {x:100 , opacity : 0} , {
        opacity :100,
        x:0,
        duration :1,
        ease : "power3.out",
        stagger : 0.25
      })
      gsap.fromTo(".line" , {x:0, opacity : 0 , width : 0 } , {
        scrollTrigger: {
          trigger: ".line",
          start: "top 80%",
          end: "bottom 100%",
          toggleActions: "play none none reverse",// Optional: Adds visual markers for testing/debugging
        },
        opacity :100,
        x:0,
        duration :1,
        ease : "power3.out",
        width : 1100,
        delay : 1
      })
      // Fade out the component
      gsap.fromTo(
        '#searchposter',
        { opacity: 1 },
        {
          opacity: 0,
          duration: fadeDuration,
          ease: 'Power3.easeInOut', // Optional easing function
        }
      );
    };
    Draggable.create(".spin", { inertia: true, type: "rotation", bounds: "body" });
  }, []);

  return (
    <>
      <div className="container mt-5 vw-100 position-relative" id="searchposter">
        <div className="position-absolute  vw-100 h-100" style={{ opacity: 0.7 ,paddingRight: '60px'}}>
          <img
            src={map}
            alt="MAP"
            className="w-100 h-100 object-cover rounded shadow   "
            style={{ maxHeight: '75' }}
          />
        </div>
        <div className="row  pt-4 position-relative" style={{ zIndex: 10, borderRadius: '15px' }}>
          <div className="col-md-6">
            <div className="card shadow rounded p-3 m-4">
              <h1 className="spin display-5 font-weight-bold"style={{ fontWeight: '600' }}>Welcome</h1>
              <p className="lead">
                In an effort to combat the growing issue of electronic waste (e-waste), our project is dedicated to responsible recycling and disposal. We provide convenient drop-off locations for old electronics, ensuring they are recycled or refurbished, reducing environmental impact and promoting a sustainable future.
              </p>
            </div>
          </div>
          <div className="col-md-6 mt-5 mb-2 d-none d-md-flex justify-content-end" style={{ opacity: 0.4 }}>
            <div className="w-100" style={{ maxHeight: '100vh', position: 'relative' }}>
              <img
                src={isdark ? poster : posterlight}
                alt="Poster"
                className="img-fluid rounded"
                style={{ height: '50vh', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
     
      <div>
        <AboutUs/>
      </div>
    </>
  );
}

export default UserDashboard;
