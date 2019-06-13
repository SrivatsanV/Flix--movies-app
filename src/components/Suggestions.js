import React from 'react';
import { Link } from 'react-router-dom';
import '../style/suggest.css';
const Suggestions = props => {
  const movies = props.movies;
  const options = movies.map(function(movie) {
    if (movie.poster_path !== null) {
      return (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} className="suggest-card">
            <img
              src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
              alt="poster"
              width="50px"
            />
            <div className="suggest-card-details">
              <h4>{movie.title}</h4>
              <p>{movie.release_date.slice(0, 4)}</p>
            </div>
          </Link>
        </li>
      );
    }
  });

  return (
    <ul className="suggestions" id="sug">
      {options}
    </ul>
  );
};

export default Suggestions;
