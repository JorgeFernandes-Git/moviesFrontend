// LoginForm.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../userContext/UserContext';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useUser();
    const [formData, setFormData] = useState({
        nickname: '',
        password: '',
    });

    const [error, setError] = useState(null); // Add an error state

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await api.post('/api/v1/login', formData);
            if (response.status === 200) {
                const userData = response.data;
                login(userData); // Set the user state upon successful login
                navigate('/Home'); // Redirect to the Home page or another appropriate destination
            } else {
                setError('Authentication failed. Please check your credentials.');
                console.error('Login failed');
            }
        } catch (error) {
            setError('Authentication failed. Please check your credentials.');
            console.error('An error occurred:', error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control
                                type="text"
                                name="nickname"
                                value={formData.nickname}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        {/* <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </Form.Group> */}
                        <Button variant="outline-info" onClick={handleSubmit}>
                            Log In
                        </Button>
                    </Form>
                    <p></p>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;
