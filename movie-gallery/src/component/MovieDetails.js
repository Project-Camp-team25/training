import React from "react";
import "../styles/MovieDetails.css";

const MovieDetails = ({ movie }) => {
  return (
    <div>
      <h3>{movie.title}</h3>
      <p>Year: {movie.year}</p>
      <p>Rating: {movie.rating}</p>
      <p>Genres: {movie.genres.join(", ")}</p>
      <p>Description: {movie.description_full}</p>
    </div>
  );
};

export default MovieDetails;
