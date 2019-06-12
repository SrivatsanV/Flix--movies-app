import React, { useEffect, useState } from 'react';
import '../style/MoviePage.css';
import { Link } from 'react-router-dom';
import Loader from '../loader.gif';

export default function MoviePage({ match }) {
  const API_KEY = process.env.REACT_APP_API;

  useEffect(() => {
    setLoader(true);
    fetchitems();
    console.log(match);
      },[match.params.id]); //eslint-disable-line

  const [movie, setMovie] = useState({});
  const [similar, setSimilar] = useState([]);

  const [poster, setPoster] = useState('');
  const [genres, setGenres] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchitems = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/' +
        match.params.id +
        '?api_key=' +
        API_KEY +
        '&language=en-US'
    );
    const simData = await fetch(
      'https://api.themoviedb.org/3/movie/' +
        match.params.id +
        '/similar?api_key=' +
        API_KEY +
        '&language=en-US&page=1'
    );
    const movie = await data.json();
    console.log(movie);
    const simMovie = await simData.json();
    setMovie(movie);
    setSimilar(simMovie.results);
    const poster_url = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;

    setPoster(poster_url);
    setGenres(movie.genres);
    setLoader(false);
  };
  const genreStyle = {
    paddingRight: '5px'
  };
  if (!loader) {
    return (
      <div>
        <div className="container">
          <div className="grid-container">
            <img src={poster} alt="poster" className="movie-img" />
            <div className="movie-details">
              <h1>{movie.title}</h1>
              <div className="genres">
                {genres.map(genre =>
                  genres.indexOf(genre) !== genres.length - 1 ? (
                    <h3 style={genreStyle}>
                      {genre.name}
                      <span style={{ paddingLeft: '5px' }}>/</span>
                    </h3>
                  ) : (
                    <h3 style={genreStyle}>{genre.name}</h3>
                  )
                )}
              </div>
              <h3>
                <i className="fa fa-star star" aria-hidden="true" />
                {movie.vote_average}
                <span style={{ fontSize: '0.8em', margin: '0px 5px' }}>
                  ({movie.vote_count})
                </span>
              </h3>
              <h4 style={{ marginTop: '50px' }}>Overview</h4>
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
        {similar.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <h2>{movie.title}</h2>
          </Link>
        ))}
      </div>
    );
  }

  return <img src={Loader} alt="loader" />;
}
