import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profile from '../../assets/profile.jpg'
import { Base_Url } from '../../config/api';
import { useNavigate } from 'react-router-dom';
import { useUserType } from '../../context/UserTypeContext';
import { Container, Row, Col, Form, Button, Card, Image, ButtonGroup } from 'react-bootstrap';
import '../../Styles/userprofile.css';

function ProfileEdit() {
    const { handleLogout } = useUserType();
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        city:"", address:"", latitude:"", longitude:"", pincode:"",mobilenumber:""
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('loggedIn');
                const recyclerId = JSON.parse(atob(token.split('.')[1])).recyclerId;
                const response = await axios.get(`${Base_Url}/api/pro/${recyclerId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data);
                console.log(response.data)
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    city:"", address:"", latitude:"", longitude:"", pincode:"",mobilenumber:""
                });
            } catch (error) {
                console.error('Error fetching user profile', error);
            }
        };

        fetchProfile();
    }, []);

    const handleLog = () => {
        handleLogout();
        navigate('/');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('loggedIn');
            const recyclerId = JSON.parse(atob(token.split('.')[1])).recyclerId;
          
            const response = await axios.put(`${Base_Url}/api/pro/${recyclerId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage(response.data.message);
            setIsEditing(false);

            const fetchProfile = async () => {
                try {
                    const token = localStorage.getItem('loggedIn');
                    const recyclerId = JSON.parse(atob(token.split('.')[1])).recyclerId;
                    const response = await axios.get(`${Base_Url}/api/pro/${recyclerId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                    setFormData({
                        name: response.data.name,
                        email: response.data.email,
                        city:"", address:"", latitude:"", longitude:"", pincode:"",mobilenumber:""
                    });
                } catch (error) {
                    console.error('Error fetching user profile', error);
                }
            };
            fetchProfile();
        } catch (error) {
            console.error('Error updating profile', error);
            setMessage('Error updating profile');
        }
    };

    return (
        <Container className="mt-5 ">
            <Row className="justify-content-center">
                <Col md={6} className="text-center">
                    <Image 
                        src={profile} 
                        roundedCircle 
                        className="mb-3" 
                        style={{ width: '100px', height: '100px' }} 
                    />
                    <div className="d-flex justify-content-center">
                        <Button variant="success" className="me-2" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                        <Button variant="danger" onClick={handleLog}>Logout</Button>
                    </div>
                </Col>
                <Col md={8} className='pt-5 h-100'>
                    <Card className=' h-100'>
                        <Card.Body  >
                            <Card.Title>Profile Details</Card.Title>
                            <Card.Text>
                                <Col>
                                    <Row sm={6} className="mb-2">
                                        <i className="bi bi-person-fill" style={{ color: '#ff4d88' }}></i>
                                        <strong className='text-start'>  Name:</strong> <span className='text-center'>{user.name}</span>
                                    </Row>
                                    
                                    <Row sm={6} className="mb-2">
                                        <i className="bi bi-envelope-fill" style={{ color: '#ff4d88' }}></i>
                                        <strong className='text-start'> Email:</strong> <span className='text-center'>{user.email}</span>
                                    </Row>
                              
                               
                                    <Row sm={6} className="mb-2">
                                        <i className="bi bi-house-fill" style={{ color: '#ff4d88' }}></i>
                                        <strong className='text-start'> Address:</strong> <span className='text-center'>{user.address}</span>
                                    </Row>
                                    <Row sm={6} className="mb-2">
                                        <i className="bi bi-phone-fill" style={{ color: '#ff4d88' }}></i>
                                        <strong className='text-start'> Mobile Number:</strong><span className='text-center'> {user.mobilenumber}</span>
                                    </Row>
                                    <Row sm={6} className="mb-2">
                                        <i className="bi bi-phone-fill" style={{ color: '#ff4d88' }}></i>
                                        <strong className='text-start'> city</strong> <span>{user.city}</span>
                                    </Row>
                                    <Row sm={6} className="mb-2">
                                        <i className="bi bi-phone-fill" style={{ color: '#ff4d88' }}></i>
                                        <strong className='text-start'> latitude</strong> {user.latitude}
                                    </Row>
                                    <Row sm={6} className="mb-2">
                                        <i className="bi bi-phone-fill" style={{ color: '#ff4d88' }}></i>
                                        <strong className='text-start'> longitude</strong> {user.longitude}
                                    </Row>
                                    <Row sm={6} className="mb-2">
                                        <i className="bi bi-phone-fill" style={{ color: '#ff4d88' }}></i>
                                        <strong className='text-start'> pincode</strong> {user.pincode}
                                    </Row>
                                </Col>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {isEditing && (
                <Row className="justify-content-center mt-3">
                    <Col md={12}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} controlId="name" className="mb-3">
                                <Form.Label column sm={3}>Name</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="email" className="mb-3">
                                <Form.Label column sm={3}>Email</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="city" className="mb-3">
                                <Form.Label column sm={3}>city</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="pincode" className="mb-3">
                                <Form.Label column sm={3}>pincode</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="Number"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="latitude" className="mb-3">
                                <Form.Label column sm={3}>latitude</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="Number"
                                        value={formData.latitude}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="longitude" className="mb-3">
                                <Form.Label column sm={3}>longitude</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="Number"
                                        value={formData.longitude}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="mobilenumber" className="mb-3">
                                <Form.Label column sm={3}>mobilenumber</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="Number"
                                        value={formData.mobilenumber}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="address" className="mb-3">
                                <Form.Label column sm={3}>address</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                            <div className="d-flex justify-content-end">
                                <Button variant="secondary" onClick={() => setIsEditing(false)} className="me-2">Cancel</Button>
                                <Button type="submit" variant="success">Save Changes</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            )}
            {message && <p className="mt-3">{message}</p>}
        </Container>
    );
}

export default ProfileEdit;
