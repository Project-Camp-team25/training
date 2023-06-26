import React, { useEffect, useState } from "react";
import "../styles/MovieIntroductions.css";
import MovieDetails from "./MovieDetails";

const MovieIntroductions = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://yts.mx/api/v2/list_movies.json");
        const data = await response.json();
        if (data && data.data && data.data.movies) {
          setMovies(data.data.movies);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeMovieDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <h2>Movie List</h2>
      <ul className="movie-list">
        {movies.map((movie) => (
          <li
            className="movie-item"
            key={movie.id}
            onClick={() => handleMovieClick(movie)}
          >
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.medium_cover_image} alt={movie.title} />
          </li>
        ))}
      </ul>
      {selectedMovie && (
        <div className="movie-details-overlay">
          <div className="movie-details-container">
            <button className="close-button" onClick={closeMovieDetails}>
              Close
            </button>
            <MovieDetails movie={selectedMovie} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieIntroductions;
