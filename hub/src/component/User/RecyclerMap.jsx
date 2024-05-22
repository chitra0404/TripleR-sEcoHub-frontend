import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
import gsap from "gsap";
import { Base_Url } from '../../config/api'; // Ensure this is the correct path

const DefaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const RecyclerMap = () => {
  const [recyclers, setRecyclers] = useState([]);
  const [coordinates, setCoordinates] = useState([13.0827, 80.2707]);
  const [searchAddress, setSearchAddress] = useState('');
  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null);

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

  useEffect(() => {
    const fadeDuration = 1;
    gsap.fromTo(
      "#searchposter",
      { opacity: 0 },
      {
        opacity: 1,
        duration: fadeDuration,
        ease: "Power3.easeInOut",
      }
    );

    return () => {
      gsap.fromTo(
        "#searchposter",
        { opacity: 1 },
        {
          opacity: 0,
          duration: fadeDuration,
          ease: "Power3.easeInOut",
        }
      );
    };
  }, []);


  return (
    <div className="container-fluid  " style={{height: '100vh', display: 'flex', flexDirection: 'column', }}>
      <div style={{ flex: 1,justifyContent: 'center', alignItems: 'center',borderRadius: '20px'}}>
      <div style={{ width: '100%', height: '75%',borderRadius: '50px' }}>

        <MapContainer 
          center={coordinates} 
          zoom={13} 
          style={{ height: '100%', width: '100%',borderRadius: '50px' }} 
          whenCreated={mapInstance => { mapRef.current = mapInstance; }}
        >
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
                <Marker key={recycler._id} position={[latitude, longitude]} icon={DefaultIcon}>
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

      <div className=" container "  style={{ flex: 2,width: '100%', height: '30%'}}>
        <h2 className='text-start'>Available recyclers list:</h2>
        <div className="row gap-4 ">
          {recyclers.map((item, index) => (
            <div key={index} className="col-md-6 col-lg-3 card   shadow-md-6 rounded-lg mb-4" style={{  maxWidth: '300px' }}>
              <div className="card-body " >
                <p className="card-text"><strong>Name</strong><span className='text-start px-3'>{item.name}</span></p>
                <p className="card-text"><strong>Address</strong><span className='text-start px-3'>{item.address}</span></p>
            
                <p className="card-text"><strong>Available:</strong><span className='text-start px-3'> {item.availability ? 'Yes' : 'No'}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
</div>
     
    </div>
  );
};

export default RecyclerMap;
