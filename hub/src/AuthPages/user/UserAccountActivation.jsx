import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../../config/api";

function UserAccountActivation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activated, setActivated] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const checkAccountActivation = async () => {
      try {
        // Make an API call to check if the account is already activated
        const response = await axios.get(`${Base_Url}/checkacc/${id}`);
        const { activated } = response.data;
        setActivated(activated);
      } catch (err) {
        console.error(err);
        setDone(true);
      }
    };

    checkAccountActivation();
  }, [id]);

  const handleActivate = async (id) => {
    try {
      setLoading(true); // Set loading state to true
      await axios.patch(`${Base_Url}/api/activate/${id}`);
      setActivated(true);
      setDone(false);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error(err);
      setDone(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#0d6efd" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div
              className="card  text-center fw-bold"
              style={{ borderRadius: "1rem", height: "10vw", fontSize: "3vw" }}
            >
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-lg-6 col-sm-12">
                  {/* Disable button when account is activated or when loading */}
                  {!activated && (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleActivate(id)}
                      disabled={loading} // Disable button when loading
                    >
                      {loading ? "Activating..." : "Click Me to Activate"}
                    </button>
                  )}
                </div>
              </div>

              <p>
                <span>
                  {activated ? "Account Activated Successfully" : null}
                  <span>{done ? "already account activated" : null}</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserAccountActivation;
