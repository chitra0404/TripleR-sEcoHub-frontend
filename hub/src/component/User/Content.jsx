import React, { useState, useEffect } from 'react';
import { Base_Url } from '../../config/api';
import axios from 'axios';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { Link } from 'react-router-dom';

function Content() {
    const [content, getContent] = useState([]);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await axios.get(`${Base_Url}/api/content`);
                getContent(res.data);
                console.log(res.data)
            } catch (err) {
                console.log("error occurred", err);
            }
        };

        fetchContent();
    }, []);

    return (
        <>
        <div
        className="text-white text-center d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: 'url(https://t4.ftcdn.net/jpg/07/66/01/19/360_F_766011975_FGP3dxr1zJ79UxOTnDaqZT0MH4Elhinl.jpg)',
          backgroundSize: 'cover',
          width: '100%',
          minHeight: '300px',
        }}
      >
        <h2 className="display-4 text-light" style={{ fontWeight: '600' }}>blog</h2>
      </div>
        <div className="card-container pt-5" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {content.map((item, index) => (
            <div className="card shadow-lg p-3 mb-10 rounded" key={index} style={{ width: '30%', margin: '10px' }}>
                <img src={item.image} className="card-img-top" alt="..." style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <Link className="card-title" to={item.link} target="_blank" rel="noopener noreferrer">clickhere</Link>
                </div>
            </div>
        ))}
    </div>
    </>
    );
}

export default Content;
