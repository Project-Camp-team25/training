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

// Custom Hook: usePagination
function usePagination(initialPage) {
  const [page, setPage] = useState(initialPage);

  const goToPreviousPage = () => {
    setPage(prevPage => prevPage - 1);
  };

  const goToNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  return { page, goToPreviousPage, goToNextPage };
}

function MovieList() {
  const { page, goToPreviousPage, goToNextPage } = usePagination(1);
  const { movies, error, loading } = useFetchMovies(
    `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year&page=${page}`
  );
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setSelectedGenre(movie.genres[0]); // 첫 번째 장르 선택
    setFilteredMovies(movies.filter((m) => m.genres.includes(movie.genres[0])));
  };

  const closeMovieDetails = () => {
    setSelectedMovie(null);
  };

  useEffect(() => {
    if (selectedGenre) {
      setFilteredMovies(movies.filter((movie) => movie.genres.includes(selectedGenre)));
    } else {
      setFilteredMovies(movies);
    }
  }, [movies, selectedGenre]);

  return (
    <div>
      <h1>Movie List</h1>
      <h3>금주의 영화</h3>
      <h3>이미지를 클릭해서 상세 내용을 확인하세요!</h3>

      <div className="genre-filter">
        <h3>장르 필터:</h3>
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">전체</option>
          {movies.map((movie) => (
            movie.genres.map((genre, index) => (
              <option key={index} value={genre}>{genre}</option>
            ))
          ))}
        </select>
      </div>

      <div className='movie-list'>
        <div className='movie-grid'>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error occurred: {error.message}</p>
          ) : (
            filteredMovies.map((movie) => (
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

      {!loading && !error && (
        <div className="pagination">
          <button className='pagination-btn' disabled={page === 1} onClick={goToPreviousPage}>
            Previous Page
          </button>
          <button className='pagination-btn' onClick={goToNextPage}>Next Page</button>
        </div>
      )}
    </div>
  );
}

export default MovieList;