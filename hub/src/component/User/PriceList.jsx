import React, { useState, useEffect } from 'react';
import { Base_Url } from '../../config/api';
import axios from 'axios';
import { MdOutlineCurrencyRupee } from "react-icons/md";

function PriceList() {
    const [price, setPrice] = useState([]);

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const res = await axios.get(`${Base_Url}/api/getprice`);
                setPrice(res.data);
            } catch (err) {
                console.log("error occurred", err);
            }
        };

        fetchPrice();
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
        <h2 className="display-4 font-weight-bolder text-light"style={{ fontWeight: '600' }}>PriceList</h2>
      </div>
        <div className="card-container " style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {price.map((item, index) => (
            <div className="card shadow-lg p-3 mb-10 rounded" key={index} style={{ width: '30%', margin: '10px' }}>
                <img src={item.image} className="card-img-top" alt="..." style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-title ">Rs:{item.price}</p>
                </div>
            </div>
        ))}
    </div>
    </>
    );
}

export default PriceList;
