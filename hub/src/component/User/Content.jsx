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
          backgroundImage: 'url(https://previews.123rf.com/images/somchai999/somchai9992003/somchai999200300066/142294714-green-leaves-background-nature-green-leaf-wall-texture-of-the-tropical-forest-plant-on-black.jpg)',
          backgroundSize: 'cover',
          width: '100%',
          minHeight: '300px',
        }}
      >
        <h2 className="display-4 font-weight-bolder text-light">blog</h2>
      </div>
        <div className="card-container pt-5" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {content.map((item, index) => (
            <div className="card shadow-lg p-3 mb-10 rounded" key={index} style={{ width: '30%', margin: '10px' }}>
                <img src={item.image} className="card-img-top" alt="..." style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <Link className="card-title ">Link:{item.link}</Link>
                </div>
            </div>
        ))}
    </div>
    </>
    );
}

export default Content;
