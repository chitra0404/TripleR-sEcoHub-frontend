import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
 import {Base_Url} from '../../config/api'

function UserRegisteration() {
  const [registered, setRegistered] = useState(false);
  const [success, setSuccess] = useState(false);
  const Navigate = useNavigate();
  
  const HandleSignup = async (name, email, password,role) => {
    const userData = {
      name,
      email,
      password,
    //   role
    };    
    try {
      await axios.post(`${Base_Url}/api/userregister`, userData)
      .then(res=>console.log(res));
      
      setRegistered(false)
      setSuccess(true);
      setTimeout(() => {
        Navigate("/");
       }, 1000);
    } catch (error) {
      console.error(error);
      setRegistered(true)
      setSuccess(false)
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "*Required";
    }
    if (!values.email) {
      errors.email = "*Required";
    }
    if (!values.password) {
      errors.password = "*Required";
    }else if(values.password.length<6){
      errors.password="*Minimum 6 character"
    }
    if (!values.repassword) {
      errors.repassword = "*Required";
    }
    if (!(values.repassword === values.password)) {
      errors.repassword = "*Password Mismatch";
    }
    // if (!values.role) {
    //     errors.role = "*Required";
    //   }
    return errors;
    
  };

  const Formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repassword: "",
    //   role:"",
    
      
    },
    validate,
    onSubmit: (values) => {
      HandleSignup(
        Formik.values.name,
        Formik.values.email,
        Formik.values.password,
        // Formik.values.role
      );
      Formik.values.name = "";
      Formik.values.email = "";
      Formik.values.password = "";
      Formik.values.repassword = "";
    //   Formik.values.role="";

    },
  });

  return (
    <section className="w-100 h-100 " >
    <div className="container ">
      <div className="row ">
          
                
                <div className="col-md-6 pt-5 w-100">
                  <div className="card-body p-lg-3 text-black">
                  

                  <form onSubmit={Formik.handleSubmit}>
                    <div className="form-outline mb-2">
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="Enter your name"
                        value={Formik.values.name}
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                      />
                      {Formik.touched.name && Formik.errors.name ? (
                        <span className="fw-bold" style={{ color: "red" }}>
                          {Formik.errors.name}
                        </span>
                      ) : null}
                    </div>

                    <div className="form-outline mb-2">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={Formik.values.email}
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                      />
                      {Formik.touched.email && Formik.errors.email ? (
                        <span className="fw-bold" style={{ color: "red" }}>
                          {Formik.errors.email}
                        </span>
                      ) : null}
                    </div>

                    <div className="form-outline mb-2">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        value={Formik.values.password}
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}                        
                      />
                      {Formik.touched.password && Formik.errors.password ? (
                        <span className="fw-bold" style={{ color: "red" }}>
                          {Formik.errors.password}
                        </span>
                      ) : null}
                    </div>

                    <div className="form-outline mb-2">
                      <input
                        type="password"
                        id="repassword"
                        className="form-control"
                        placeholder="Repeat password"
                        value={Formik.values.repassword}
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                      />
                      {Formik.touched.repassword && Formik.errors.repassword ? (
                        <span className="fw-bold" style={{ color: "red" }}>
                          {Formik.errors.repassword}
                        </span>
                      ) : null}
                    </div>
                    {/* <div className="form-outline mb-2">
                      <input
                        type="text"
                        id="role"
                        className="form-control"
                        placeholder="Enter your role"
                        value={Formik.values.role}
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                      />
                      {Formik.touched.role && Formik.errors.role ? (
                        <span className="fw-bold" style={{ color: "red" }}>
                          {Formik.errors.role}
                        </span>
                      ) : null}
                    </div> */}

                    <div className="form-check d-flex justify-content-center">
                      <label
                        className="form-check-label"
                        htmlFor="checkbox"
                        
                      >
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          id="checkbox"
                          checked                                                                             
                        />
                        I agree all statements in Terms of service
                      </label>
                    </div>
                    <div className="form-outline text-center">
                      <span className="text-danger fw-bold">
                        {registered ? "User exist,Try with new mail id" : null}
                      </span>{" "}
                      <br />
                      <span className="text-primary fw-bold">
                        {success
                          ? "Account Activation link send to your mail id"
                          : null}
                      </span>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-dark btn-lg btn-block"
                      >
                        Register
                      </button>
                    </div>

                  
                  </form>
                </div>
              </div>
            </div>
          </div>
       
     
    </section>
  );
}

export default UserRegisteration;