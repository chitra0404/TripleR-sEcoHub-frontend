import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profile from '../../assets/profile.jpg'
import { Base_Url } from '../../config/api';
import { useNavigate } from 'react-router-dom';
import { useUserType } from '../../context/UserTypeContext';
import { Container, Row, Col, Form, Button, Card, Image, ButtonGroup } from 'react-bootstrap';
import '../../Styles/userprofile.css';

function UserProfile() {
    const { handleLogout } = useUserType();
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cardNumber: '',
        cardExpiry: '',
        cardCVV: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('loggedIn');
                const userId = JSON.parse(atob(token.split('.')[1])).userId;
                const response = await axios.get(`${Base_Url}/api/profile/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data);
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    cardNumber: '',
                    cardExpiry: '',
                    cardCVV: ''
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
            const userId = JSON.parse(atob(token.split('.')[1])).userId;
            const response = await axios.put(`${Base_Url}/api/profile/${userId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage(response.data.message);
            setIsEditing(false);

            const fetchProfile = async () => {
                try {
                    const token = localStorage.getItem('loggedIn');
                    const userId = JSON.parse(atob(token.split('.')[1])).userId;
                    const response = await axios.get(`${Base_Url}/api/profile/${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                    setFormData({
                        name: response.data.name,
                        email: response.data.email,
                        cardNumber: '',
                        cardExpiry: '',
                        cardCVV: ''
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
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6} className="text-center">
                    <Image 
                        src={profile} 
                        roundedCircle 
                        className="mb-3" 
                        style={{ width: '150px', height: '150px' }} 
                    />
                    <div className="d-flex justify-content-center">
                        <Button variant="success" className="me-2" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                        <Button variant="danger" onClick={handleLog}>Logout</Button>
                    </div>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Profile Details</Card.Title>
                            <Card.Text>
                                <Col>
                                    <Row sm={6} className="mb-2">
                                        <i className="bi bi-person-fill" style={{ color: '#ff4d88' }}></i>
                                        <strong>  Name:</strong> 
                                    </Row>
                                    
                                    <Row sm={6} className="mb-2">
                                        <i className="bi bi-envelope-fill" style={{ color: '#ff4d88' }}></i>
                                        <strong> Email:</strong> {user.email}
                                    </Row>
                              
                               
                                    <Row sm={6} className="mb-2">
                                        <i className="bi bi-house-fill" style={{ color: '#ff4d88' }}></i>
                                        <strong> Address:</strong> {user.address}
                                    </Row>
                                    <Row sm={6} className="mb-2">
                                        <i className="bi bi-phone-fill" style={{ color: '#ff4d88' }}></i>
                                        <strong> Mobile Number:</strong> {user.mobilenumber}
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
                            <Form.Group as={Row} controlId="cardNumber" className="mb-3">
                                <Form.Label column sm={3}>Card Number</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        value={formData.cardNumber}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="cardExpiry" className="mb-3">
                                <Form.Label column sm={3}>Card Expiry</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        value={formData.cardExpiry}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="cardCVV" className="mb-3">
                                <Form.Label column sm={3}>Card CVV</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        value={formData.cardCVV}
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

export default UserProfile;
