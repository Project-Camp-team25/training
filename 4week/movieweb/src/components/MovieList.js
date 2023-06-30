import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/MovieList.css";

// Custom Hook: useFetchMovies
function useFetchMovies(url) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(url);
        setMovies(response.data.data.movies);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [url]);

  return { movies, error, loading };
}

function MovieList() {
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const { movies, error, loading } = useFetchMovies(
    `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year&page=${page}`
  );
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeMovieDetails = () => {
    setSelectedMovie(null);
  };

  const goToPreviousPage = () => {
    setPage(prevPage => prevPage - 1);
  };

  const goToNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <h1>Movie List</h1>
      <h3>금주의 영화</h3>
      <h3>이미지를 클릭해서 상세 내용을 확인하세요!</h3>
      <div className='movie-list'>
        <div className='movie-grid'>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error occurred: {error.message}</p>
          ) : (
            movies.map((movie) => (
              <div key={movie.id} onClick={() => handleMovieClick(movie)}>
                <img src={movie.medium_cover_image} alt={movie.title} width={300} height={400} />
              </div>
            ))
          )}
        </div>
      </div>

      {selectedMovie && (
        <div className="modal-overlay" onClick={closeMovieDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img className='modal-img' src={selectedMovie.medium_cover_image} alt={selectedMovie.title} width={200} height={300} />
            <div className='model-txt'>
              <h2>영화제목:<br />{selectedMovie.title}</h2>
              <h4>줄거리:<br />{selectedMovie.description_full.length > 500 ? selectedMovie.description_full.slice(0, 500) + '...' : selectedMovie.description_full}</h4>
              <p>Rating: {selectedMovie.rating} / 10</p>
              <button onClick={closeMovieDetails}>Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="pagination">
        <button className='pagination-btn' disabled={page === 1} onClick={goToPreviousPage}>
          Previous Page
        </button>
        <button className='pagination-btn' onClick={goToNextPage}>Next Page</button>
      </div>
    </div>
  );
}

export default MovieList
