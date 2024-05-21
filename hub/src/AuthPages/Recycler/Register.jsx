import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
 import {Base_Url} from '../../config/api'

function Register() {
  const [registered, setRegistered] = useState(false);
  const [success, setSuccess] = useState(false);
  const Navigate = useNavigate();

  const HandleSignup = async (
    name,
    email,
    password,
    city,
    address,
    latitude,
    longitude,
    pincode,
    mobilenumber
  ) => {
    const userData = {
      name,
      email,
      password,
      city,
      address,
      latitude,
      longitude,
      pincode,
      mobilenumber
    };
    try {
      await axios.post(`${Base_Url}/api/re-register`, userData)

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
    } else if (values.password.length < 6) {
      errors.password = "*Minimum 6 characters";
    }
    if (!values.repassword) {
      errors.repassword = "*Required";
    }
    if (!(values.repassword === values.password)) {
      errors.repassword = "*Password Mismatch";
    }
    if (!values.city) {
      errors.city = "*Required";
    }
    if (!values.address) {
      errors.address = "*Required";
    }
    if (!values.latitude) {
      errors.latitude = "*Required";
    }
    if (!values.longitude) {
      errors.longitude = "*Required";
    }
    if (!values.pincode) {
      errors.pincode = "*Required";
    }
    if (!values.mobilenumber) {
      errors.mobilenumber = "*Required";
    }
    return errors;
  };

  const Formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repassword: "",
      city: "",
      address: "",
      latitude: "",
      longitude: "",
      pincode: "",
      mobilenumber: ""
    },
    validate,
    onSubmit: (values) => {
      HandleSignup(
        Formik.values.name,
        Formik.values.email,
        Formik.values.password,
        Formik.values.city,
        Formik.values.address,
        Formik.values.latitude,
        Formik.values.longitude,
        Formik.values.pincode,
        Formik.values.mobilenumber
      );
      Formik.values.name = "";
      Formik.values.email = "";
      Formik.values.password = "";
      Formik.values.repassword = "";
      Formik.values.city = "";
      Formik.values.address = "";
      Formik.values.latitude = "";
      Formik.values.longitude = "";
      Formik.values.pincode = "";
      Formik.values.mobilenumber = "";
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
    <span className="fw-bold text-danger">
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
    <span className="fw-bold text-danger">
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
    <span className="fw-bold text-danger">
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
    <span className="fw-bold text-danger">
      {Formik.errors.repassword}
    </span>
  ) : null}
</div>

<div className="form-outline mb-2">
  <input
    type="text"
    id="city"
    className="form-control"
    placeholder="Enter your city"
    value={Formik.values.city}
    onChange={Formik.handleChange}
    onBlur={Formik.handleBlur}
  />
  {Formik.touched.city && Formik.errors.city ? (
    <span className="fw-bold text-danger">
      {Formik.errors.city}
    </span>
  ) : null}
</div>

<div className="form-outline mb-2">
  <input
    type="text"
    id="address"
    className="form-control"
    placeholder="Enter your address"
    value={Formik.values.address}
    onChange={Formik.handleChange}
    onBlur={Formik.handleBlur}
  />
  {Formik.touched.address && Formik.errors.address ? (
    <span className="fw-bold text-danger">
      {Formik.errors.address}
    </span>
  ) : null}
</div>

<div className="form-outline mb-2">
  <input
    type="number"
    id="latitude"
    className="form-control"
    placeholder="Enter your latitude"
    value={Formik.values.latitude}
    onChange={Formik.handleChange}
    onBlur={Formik.handleBlur}
  />
  {Formik.touched.latitude && Formik.errors.latitude ? (
    <span className="fw-bold text-danger">
      {Formik.errors.latitude}
    </span>
  ) : null}
</div>

<div className="form-outline mb-2">
  <input
    type="number"
    id="longitude"
    className="form-control"
    placeholder="Enter your longitude"
    value={Formik.values.longitude}
    onChange={Formik.handleChange}
    onBlur={Formik.handleBlur}
  />
  {Formik.touched.longitude && Formik.errors.longitude ? (
    <span className="fw-bold text-danger">
      {Formik.errors.longitude}
    </span>
  ) : null}
</div>

<div className="form-outline mb-2">
  <input
    type="number"
    id="pincode"
    className="form-control"
    placeholder="Enter your pincode"
    value={Formik.values.pincode}
    onChange={Formik.handleChange}
    onBlur={Formik.handleBlur}
  />
  {Formik.touched.pincode && Formik.errors.pincode ? (
    <span className="fw-bold text-danger">
      {Formik.errors.pincode}
    </span>
  ) : null}
</div>

<div className="form-outline mb-2">
  <input
    type="number"
    id="mobilenumber"
    className="form-control"
    placeholder="Enter your mobile number"
    value={Formik.values.mobilenumber}
    onChange={Formik.handleChange}
    onBlur={Formik.handleBlur}
  />
  {Formik.touched.mobilenumber && Formik.errors.mobilenumber ? (
    <span className="fw-bold text-danger">
      {Formik.errors.mobilenumber}
    </span>
  ) : null}
</div>
                  
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

                    <p className="text-center text-muted">
                      Have already an account?{" "}
                      <Link to="/" className="fw-bold text-body">
                        <u>Login here</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
      
      
    </section>
  );
}

export default Register;