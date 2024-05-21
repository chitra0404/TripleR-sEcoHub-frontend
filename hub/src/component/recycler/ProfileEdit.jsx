import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Base_Url } from '../../config/api';

function ProfileEdit() {
    
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    address: '',
    latitude: '',
    longitude: '',
    pincode: '',
    mobilenumber: ''
  });
  useEffect(() => {
    const token = localStorage.getItem('loggedIn');
    if (token) {
      const { recyclerId } = JSON.parse(atob(token.split('.')[1]));
      setProfile({ ...profile, recyclerId });
      console.log(recyclerId);
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('loggedIn');
    // Fetch the current profile details from the serverconst token = localStorage.getItem('loggedIn');
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      axios.get(`${Base_Url}/api/profile`,config)
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the profile!', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('loggedIn');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    axios.put(`${Base_Url}/api/profile`, profile, config)
      .then(response => {
        alert('Profile updated successfully');
      })
      .catch(error => {
        console.error('There was an error updating the profile!', error);
      });
  };

  return (
    <div className="profile-edit">
      <div className="profile-sidebar">
        <img src="/path/to/profile/image" alt="Profile" />
        <h2>{profile.name}</h2>
        <p>{profile.email}</p>
      </div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Profile Settings</h2>
        <label>Name</label>
        <input type="text" name="name" value={profile.name} onChange={handleChange} />
        <label>Email</label>
        <input type="email" name="email" value={profile.email} onChange={handleChange} />
        <label>Password</label>
        <input type="password" name="password" value={profile.password} onChange={handleChange} />
        <label>Mobile Number</label>
        <input type="text" name="mobilenumber" value={profile.mobilenumber} onChange={handleChange} />
        <label>City</label>
        <input type="text" name="city" value={profile.city} onChange={handleChange} />
        <label>Address</label>
        <input type="text" name="address" value={profile.address} onChange={handleChange} />
        <label>Latitude</label>
        <input type="text" name="latitude" value={profile.latitude} onChange={handleChange} />
        <label>Longitude</label>
        <input type="text" name="longitude" value={profile.longitude} onChange={handleChange} />
        <label>Pincode</label>
        <input type="text" name="pincode" value={profile.pincode} onChange={handleChange} />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default ProfileEdit;
