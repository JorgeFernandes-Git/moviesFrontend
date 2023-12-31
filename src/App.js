import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';
import UserForm from './components/userForm/UserForm';
import LoginForm from './components/loginForm/LoginForm';
import MovieForm from './components/movieForm/MovieForm';

function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      // console.log(singleMovie.reviewsIds);
      setReviews(singleMovie.reviewsIds);
    } catch (error) {
      console.error(error);
    }
  }

  const handleFormSubmit = (formData) => {
    // Handle the form submission here, e.g., send the formData to your backend or perform some action
    console.log('User data submitted:', formData);
  }

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/Home" element={<Home movies={movies} />} />
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
          <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />} />
          <Route path="/Register" element={<UserForm onSubmit={handleFormSubmit} />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/AddMovie" element={<MovieForm />} />
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
