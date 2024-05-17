import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
 import { Base_Url } from "../../config/api";
import { useUserType } from "../../context/UserTypeContext";

function UserLogin() {
    const {setUserType,loading,setLoading,error,setError}=useUserType();
  const [success, setSuccess] = useState(false);
  const [invalid, setInvaild] = useState(false);
   const Navigate = useNavigate();

  const HandleLogin = async (email, password) => {
    try {
      const res = await axios.post(`${Base_Url}/api/userlogin`, { email, password});
      const userType=res.data.role;
console.log(res);
      window.localStorage.setItem("loggedIn", (res.data.token));
      setInvaild(false);
      setSuccess(true);
      setUserType(userType);
      console.log("userType",userType)
      setTimeout(() => {
         Navigate("/user");
      }, 500);
    } catch (err) {
      console.log(err);
      setSuccess(false);
      setInvaild(true);
      setError("Invalid user/Acctivate your account through mail ")
    }
    finally{
      setLoading(false);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "*email Required";
    }
    if (!values.password) {
      errors.password = "*password Required";
    }
    return errors;
  };

  const Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      HandleLogin(Formik.values.email, Formik.values.password);
      Formik.values.email = "";
      Formik.values.password = "";
    },
  });

  return (
    <section className="w-100 h-100 " >
      <div className="container ">
        <div className="row ">
          
            
                <div className="col-md-6 w-100  ">
                  <div className="card-body p-lg-3 ">
                    <form onSubmit={Formik.handleSubmit}>
                      <div className="d-flex align-items-center ">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        ></i>
                        <span className="h1 fw-bold"></span>
                      </div>

                      <h5
                        className="fw-normal "
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign in as Consumer
                      </h5>

                      <div className="form-outline">
                        <label className="form-label " htmlFor="loginemail">
                          Email address :
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-control form-control-lg"
                          placeholder="Email address"
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
                        <label className="form-label " htmlFor="loginpassword">
                          Password :
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          placeholder="Enter your Password"
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
                      
                      {loading ? (
                                                <p>Loading...</p>
                                            ) : (
                                                <div>
                                                    {success && <p className="text-primary">Successfully logged in</p>}
                                                    {error && <p className="text-danger">{error}</p>}
                                                </div>
                                            )}

                      <div className="pt-1 mb-2">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                          disabled={loading}
                        >
                           {loading ? 'Loading...' : 'Login'}
                        </button>
                      </div>
                      <Link
                        to="/forgot"
                        className="small text-muted text-white"
                      >
                        Forgot password?
                      </Link>
                      
                      
                      <p className="small text-white">
                        Terms of use. Privacy policy
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          
    </section>
  );
}

export default UserLogin;