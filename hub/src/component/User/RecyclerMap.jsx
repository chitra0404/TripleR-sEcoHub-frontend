import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios';
import L from 'leaflet';
import { Base_Url } from '../../config/api'; // Ensure this is the correct path

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;


const RecyclerMap = () => {
  const [recyclers, setRecyclers] = useState([]);

  useEffect(() => {
    const fetchRecyclers = async () => {
      try {
        const response = await axios.get(`${Base_Url}/api/getrecycler`);
        setRecyclers(response.data.message);
      } catch (error) {
        console.error('Error fetching recyclers:', error);
      }
    };
    fetchRecyclers();
  }, []);

  return (
    <div className="container-fluid " style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Map Container */}
      <div style={{ flex: 1, width: '100%' }}>
        <MapContainer center={[13.0827, 80.2707]} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {recyclers.map((recycler) => {
            const { location } = recycler;
            const { coordinates } = location || {};
            if (coordinates && coordinates.length === 2) {
              const [longitude, latitude] = coordinates;
              return (
                <Marker key={recycler._id} position={[latitude, longitude]} >
                  <Popup>
                    <div>
                      <strong>{recycler.name}</strong><br />
                      Address: {recycler.address}<br />
                      City: {recycler.city}<br />
                      Available: {recycler.availability ? 'Yes' : 'No'}
                    </div>
                  </Popup>
                </Marker>
              );
            }
            return null;
          })}
        </MapContainer>
      </div>

      {/* Details Container */}
      <div className='row pt-5'>
       
        {recyclers.map((item, index) => (
          <div className="card " key={index} style={{ width: '50%' }}>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">Address:{item.address}</p>
              <p className="card-text">pincode:{item.pincode}</p>

              <p className="card-text"><strong>City:</strong> {item.city}</p>
              <p className="card-text"><strong>Available:</strong> {item.availability ? 'Yes' : 'No'}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default RecyclerMap;
