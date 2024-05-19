import React from 'react';
import { useUserType } from './context/UserTypeContext';
import { IoSunnyOutline } from "react-icons/io5";
import { IoIosMoon } from "react-icons/io";
import './Styles/Toggle.css'; // Ensure this path is correct

function Toggle() {
  const { isdark, setisdark } = useUserType();
  const body = document.body;

  const modetoggle = () => {
    if (body.classList.contains("light")) {
      body.classList.remove("light");
      setisdark(!isdark);
    } else {
      body.classList.add("light");
      setisdark(!isdark);
    }
  };

  return (
    <div className='z-1'>
      {!isdark ? (
        <button
          className="button-no-border shadow-5xl font-medium font-poppins hover:text-[#01796f] transition-transform nav"
          onClick={modetoggle}
        >
          <IoIosMoon />
        </button>
      ) : (
        <button
          className="button-no-border shadow-5xl font-medium font-poppins hover:text-[#01796f] transition-transform nav"
          onClick={modetoggle}
        >
          <IoSunnyOutline />
        </button>
      )}
    </div>
  );
}

export default Toggle;
