import { useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import React from 'react'
import { Button } from 'react-bootstrap';


const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, [])

    const addReview = async (event) => {
        event.preventDefault();
        const rev = revText.current;

        if (rev.value !== "") {
            try {
                const response = await api.post("/api/v1/reviews", { reviewBody: rev.value, imdbId: movieId });
                // console.log(response.data.id)
                const newReviewId = response.data.id;
                const newReview = { body: rev.value, id: newReviewId, timestamp: Date.now() };
                const updatedReviews = [...reviews, newReview];
                rev.value = "";
                setReviews(updatedReviews);
            }
            catch (err) {
                console.error(err);
            }
        }
    }

    const deleteReview = async (id) => {
        try {
            // console.log({ id })
            await api.delete(`/api/v1/reviews/${id}`);
            const updatedReviews = reviews.filter((r) => r.id !== id);
            setReviews(updatedReviews);
        } catch (error) {
            console.error(error);
        }
    }

    const sortedReviews = [...reviews].sort((a, b) => b.timestamp - a.timestamp);

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        sortedReviews?.map((review) => {
                            // console.log(r.id);
                            return (
                                <div key={review.id}>
                                    <Row >
                                        <Col>{review.body}</Col>
                                        <Col>
                                            <Button variant="outline-info" onClick={() => deleteReview(review.id)}>Delete</Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews