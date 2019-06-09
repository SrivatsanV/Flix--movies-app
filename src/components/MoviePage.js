import React, { useEffect, useState } from 'react';

export default function MoviePage({ match }) {
  const API_KEY = process.env.REACT_APP_API;

  useEffect(() => {
    fetchitems();
    console.log(match);
      },[]); //eslint-disable-line

  const [movie, setMovie] = useState({});
  const [poster, setPoster] = useState('');
  const fetchitems = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/' +
        match.params.id +
        '?api_key=' +
        API_KEY +
        '&language=en-US'
    );

    const movie = await data.json();
    console.log(movie);

    setMovie(movie);
    console.log(movie.title);
    const poster_url = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;

    setPoster(poster_url);
  };
  return (
    <div>
      <img src={poster} alt="poster" width="120px" />
      <h1>{movie.title}</h1>
      <h3>Ratings : {movie.vote_average}</h3>
      <p>{movie.overview}</p>
    </div>
  );
}
