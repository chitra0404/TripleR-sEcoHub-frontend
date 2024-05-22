import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../../Styles/style.css';
import gsap from "gsap";

const QueryForm = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('loggedIn');
      if (!token) {
        throw new Error('No token found');
      }
      const recyclerId = JSON.parse(atob(token.split('.')[1])).recyclerId;

      const complaint = { title, type, description, recycler: recyclerId };

      const response = await axios.post('http://localhost:5000/api/query', complaint, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      if (response.status === 201) {
        alert('Complaint submitted successfully!');
        setTitle('');
        setType('');
        setDescription('');
      } else {
        alert('Failed to submit complaint.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting complaint.');
    }
  };

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
            <h2 className="display-4 font-weight-bolder text-light">Query</h2>

    
    </div>
    <Container className="auth query-form-container mt-5 custom-border">
      <h1 className="text-center">Submit a Query</h1>
      <Form onSubmit={handleSubmit} className="query-form">
        <Form.Group controlId="title" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input-line"
          />
        </Form.Group>

        <Form.Group controlId="type" className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Control
            as="select"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="input-line"
          >
            <option value="">Select Type</option>
            <option value="payment">Payment</option>
            <option value="pickup">Pickup</option>
            <option value="other">Other</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="input-line"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
    </>
  );
};

export default QueryForm;
