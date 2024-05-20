import React, { useEffect } from 'react';
import gsap from "gsap";
const fadeDuration = 1; // Fade duration in seconds



function AboutUs() {
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
    <div className="container pt-3 mt-5" id="about">
      <h1 className="mb-5 font-weight-bold text-center">
        About Us 
      </h1>
      <div id="searchposter" className="row mb-4">
        <div className="col-md-6 mb-4">
          <div className="card shadow-lg  h-100">
            <div className="card-body text-center">
              {/* <img
                src=""
                alt="Best Price"
                className="img-fluid rounded-circle mb-3"
                style={{ height: '7vh', padding: '1rem', backgroundColor: '#1A1A1A' }}
              /> */}
              <h2 className="card-title">Best Price</h2>
              <p className="card-text">
                Determine the value of your e-waste items effortlessly using our "Best Price" feature. By inputting item details, such as make and condition, you'll receive an accurate estimate before recycling. We take pride in offering competitive rates, ensuring you get the highest return for your electronics.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card shadow-lg  h-100">
            <div className="card-body text-center">
              {/* <img
                src=""
                alt="Education"
                className="img-fluid rounded-circle mb-3"
                style={{ height: '7vh', padding: '1rem', backgroundColor: '#1A1A1A' }}
              /> */}
              <h2 className="card-title">Education</h2>
              <p className="card-text">
                Explore our extensive "Education" section to gain insights into responsible e-waste disposal. We provide comprehensive resources, including articles and guides, to help you understand the environmental impact of e-waste and the importance of recycling.
              </p>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default AboutUs;
