import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profile from '../../assets/profile.jpg';
import { Base_Url } from '../../config/api';
import { useNavigate } from 'react-router-dom';
import { useUserType } from '../../context/UserTypeContext';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import '../../Styles/userprofile.css';

function AdminProfile() {
    const { handleLogout } = useUserType();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${Base_Url}/api/getadmin`);
                setUsers(response.data.message);
                console.log(response.data.message);
            } catch (error) {
                console.error('Error fetching user profiles', error);
            }
        };

        fetchUsers();
    }, []);

    const handleLog = () => {
        handleLogout();
        navigate('/');
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
                        <Button variant="danger" onClick={handleLog}>Logout</Button>
                    </div>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Profile Details</Card.Title>
                            <Card.Text>
                                {users.map((user, index) => (
                                    <Col key={index} className="mb-2">
                                        <Row sm={6}>
                                            <i className="bi bi-person-fill" style={{ color: '#ff4d88' }}></i>
                                            <strong className='text-start'> Name: </strong>{user.name}
                                        </Row>
                                        <Row sm={6}>
                                            <i className="bi bi-envelope-fill" style={{ color: '#ff4d88' }}></i>
                                            <strong className='text-start'> Email: </strong>{user.email}
                                        </Row>
                                    </Col>
                                ))}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminProfile;
