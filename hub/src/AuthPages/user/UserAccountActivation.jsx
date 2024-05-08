import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../../config/api";

function UserAccountActivation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activated, setActivated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAccountActivation = async () => {
      try {
        const response = await axios.get(`${Base_Url}/checkacc/${id}`);
        const { activated } = response.data;
        setActivated(activated);
      } catch (err) {
        console.error(err);
      }
    };

    checkAccountActivation();
  }, [id]);

  const handleActivate = async () => {
    try {
      setLoading(true);
      await axios.patch(`${Base_Url}/api/activate/${id}`);
      setActivated(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#0d6efd" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div
              className="card text-center fw-bold"
              style={{ borderRadius: "1rem", height: "10vw", fontSize: "3vw" }}
            >
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-lg-6 col-sm-12">
                  {!activated && (
                    <button
                      className="btn btn-primary"
                      onClick={handleActivate}
                      disabled={loading}
                    >
                      {loading ? "Activating..." : "Click Me to Activate"}
                    </button>
                  )}
                </div>
              </div>

              <p>
                <span>{activated && "Account Activated Successfully"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserAccountActivation;
