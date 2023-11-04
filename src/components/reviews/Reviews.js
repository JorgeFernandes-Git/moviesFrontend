import { useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import React from 'react'
import { Button } from 'react-bootstrap';
import { useUser } from '../userContext/UserContext';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;
    const { user } = useUser();
    const isUserLoggedIn = !!user; // Check if the user is logged in

    useEffect(() => {
        getMovieData(movieId);
    }, [])

    const addReview = async (event) => {
        event.preventDefault();
        const rev = revText.current;

        if (!user) {
            // Check if the user is not logged in, and take the appropriate action (e.g., show an error message)
            console.log("User is not logged in. Please log in to post a review.");
            return;
        }

        if (rev.value !== "") {
            try {
                // console.log(user)
                const response = await api.post("/api/v1/reviews", {
                    reviewBody: rev.value,
                    imdbId: movieId,
                    userId: user.id,
                    userNickname: user.nickname
                });
                const userNickname = response.data.userNickname;

                const newReviewId = response.data.id;
                const newReview = {
                    body: rev.value,
                    id: newReviewId,
                    timestamp: Date.now(),
                    userId: user.id,
                    userNickname: userNickname,
                };
                const updatedReviews = [...reviews, newReview];
                rev.value = "";
                setReviews(updatedReviews);
            } catch (err) {
                console.error(err);
            }
        }
    }

    const deleteReview = async (id) => {
        try {

            if (!user) {
                console.log("User is not logged in. Please log in to delete a review.");
                return;
            }

            const reviewToDelete = reviews.find((review) => review.id === id);
            if (reviewToDelete.userNickname === user.nickname) {
                // Only allow the review to be deleted if it belongs to the current user
                await api.delete(`/api/v1/reviews/${id}`);
                const updatedReviews = reviews.filter((r) => r.id !== id);
                setReviews(updatedReviews);
            } else {
                console.log("You can only delete your own reviews.");
            }
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
                            const isReviewOwner = review.userNickname === user?.nickname;
                            return (
                                <div key={review.id}>
                                    <Row >
                                        <Col>
                                            <p><strong>{review.userNickname}</strong>: {review.body}</p>
                                        </Col>
                                        <Col>
                                            <Button
                                                variant="outline-info"
                                                onClick={() => deleteReview(review.id)}
                                                disabled={!isUserLoggedIn || !isReviewOwner}
                                            >
                                                Delete
                                            </Button>
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