import React, { useState } from 'react';
import axios from 'axios';
import { Base_Url } from '../../config/api'; // Ensure this is the correct path
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const SearchRecyclers = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [recyclers, setRecyclers] = useState([]);

    const handleSearch = async () => {
        try {
            const res = await axios.get(`${Base_Url}/api/search`, {
                params: {
                    latitude,
                    longitude,
                    maxDistance: 5000 // Example: 5 km radius
                }
            });
            setRecyclers(res.data.message);
        } catch (err) {
            console.error('Error searching recyclers:', err);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
            />
            <input
                type="text"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
            />
            <button onClick={handleSearch}>Search Recyclers</button>

            {recyclers.length > 0 && (
                <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: "400px", width: "50%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {recyclers.map((recycler) => (
                        <Marker key={recycler._id} position={recycler.location.coordinates.reverse()}>
                            <Popup>{recycler.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            )}
        </div>
    );
};

export default SearchRecyclers;
