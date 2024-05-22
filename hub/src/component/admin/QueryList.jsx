import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Base_Url } from '../../config/api';
import '../../Styles/admin.css';  

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
  }, [activeTab])


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container vh-100 vw-100 justify-content-center mt-5 pt-5">
      <h2 className="bg-warning p-2 text-center">Query</h2>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
        {/* Add any additional buttons or filters here */}
      </div>
      <table className="table table-hover border border-3 shadow-sm">
        <thead className="table-dark">
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
