import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const MovieForm = ({ onMovieCreated }) => {
    const [formData, setFormData] = useState({
        imdbId: '',
        title: '',
        releaseDate: '',
        trailerLink: '',
        poster: '',
        genres: '', // Use a single text field for genres
        backdrops: '', // Use a single text field for backdrops
    });

    const [movieCreated, setMovieCreated] = useState(false);
    const navigate = useNavigate(); // Get the navigate function

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        // Convert genres and backdrops to arrays using split(',')
        const genresArray = formData.genres.split(',').map((genre) => genre.trim());
        const backdropsArray = formData.backdrops.split(',').map((backdrop) => backdrop.trim());

        // Combine the updated arrays with other form data
        const updatedFormData = {
            ...formData,
            genres: genresArray,
            backdrops: backdropsArray,
        };

        // console.log(updatedFormData);

        try {
            // Replace the API endpoint with the one for creating a movie
            const response = await api.post('/api/v1/movies', updatedFormData); // Update the API endpoint

            if (response.status === 201) {
                // Assuming you have a callback function for successful movie creation
                onMovieCreated(updatedFormData);
                setMovieCreated(true);
                // navigate('/Home');

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
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Release Date</Form.Label>
                            <Form.Control
                                type="text"
                                name="releaseDate"
                                value={formData.releaseDate}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Trailer Link</Form.Label>
                            <Form.Control
                                type="text"
                                name="trailerLink"
                                value={formData.trailerLink}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Poster</Form.Label>
                            <Form.Control
                                type="text"
                                name="poster"
                                value={formData.poster}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>IMDB ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="imdbId"
                                value={formData.imdbId}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Genres (Comma-separated)</Form.Label>
                            <Form.Control
                                type="text"
                                name="genres"
                                value={formData.genres}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Backdrops (Comma-separated)</Form.Label>
                            <Form.Control
                                type="text"
                                name="backdrops"
                                value={formData.backdrops}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button variant="outline-info" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                    {movieCreated && (
                        <Alert variant="success">
                            Movie created successfully.
                        </Alert>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default MovieForm;
