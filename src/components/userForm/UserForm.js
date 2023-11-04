import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useUser } from '../userContext/UserContext';


const UserForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        age: '',
        nickname: '',
    });

    const [userCreated, setUserCreated] = useState(false);
    const navigate = useNavigate();
    const { login } = useUser();

    useEffect(() => {
        if (userCreated) {
            // Wait for 3 seconds before redirecting
            const timeoutId = setTimeout(() => {
                navigate('/Home'); // Use navigate for redirection
            }, 3000);

            return () => {
                clearTimeout(timeoutId); // Clear the timeout if the component unmounts
            };
        }
    }, [userCreated, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await api.post('/api/v1/users', formData);
            if (response.status === 201) {
                onSubmit(formData);
                setUserCreated(true);
                login(formData); // Set the user state upon successful login
            } else {
                console.error('User creation failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control
                                type="text"
                                name="nickname"
                                value={formData.nickname}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button variant="outline-info" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                    {userCreated && (
                        <div>
                            <p></p>
                            <p>User {formData.nickname} created successfully. Redirecting to the Home page.</p>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default UserForm;
