import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Base_Url } from '../../config/api';
import '../../Styles/admin.css';  
import gsap from 'gsap';

const QueryList = () => {
  const [query, setQuery] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchquery = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${Base_Url}/api/query`); // Ensure this endpoint is correct
        setQuery(response.data.message);
        console.log(response.data.message);
      } catch (error) {
        setError('Error fetching query');
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchquery();
  }, []);
  useEffect(() => {
    gsap.fromTo(".auth", {x:400 , opacity : 0},{x : 0 , opacity: 100 , duration : 2 , ease : "power3.out" , stagger : 0.25});
  }, [])


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container vh-100 vw-100 justify-content-center mt-5 pt-5">
       <div
    className="text-white text-center d-flex align-items-center justify-content-center"
    style={{
      backgroundImage: 'url(https://t4.ftcdn.net/jpg/07/66/01/19/360_F_766011975_FGP3dxr1zJ79UxOTnDaqZT0MH4Elhinl.jpg)',
      backgroundSize: 'cover',
      width: '100%',
      minHeight: '300px',
    }}
  >
            <h2 className="display-4 font-weight-bolder text-light"style={{ fontWeight: '600' }}>QueryList</h2>

    
    </div>
      
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
       
      </div>
      <table className="table table-bordered  border-3 shadow-sm">
        <thead className="table">
          <tr>
            <th>QueryId</th>
            <th>Recycler ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Description</th>
            
          </tr>
        </thead>
        <tbody>
          {query.map(item => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.recycler}</td>
              <td>{item.title}</td>
              <td>{item.type}</td>
              <td>{item.description}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueryList;
