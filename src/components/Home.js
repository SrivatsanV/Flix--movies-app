import React, { useState, useEffect } from 'react';
import Card from './MovieCard';

export default function Home() {
  const API_KEY = process.env.REACT_APP_API;
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(true);

  const resultsContainer = {
    margin: 'auto 10% auto 10%',
    textAlign: 'center'
  };

  useEffect(() => {
    setLoader(true);
    fetchitems();
  },[]); //eslint-disable-line

  const fetchitems = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?api_key=' +
        API_KEY +
        '&language=en-US&page=1'
    );

    const movies = await data.json();
    console.log(movies);

    const now_movies = movies.results;
    setMovies(now_movies);
    setTimeout(function() {
      setLoader(false);
    }, 2000);
  };

  if (!loader) {
    return (
      <div style={{ backgroundColor: 'rgb(29,29,29)' }}>
        <div style={resultsContainer}>
          <div style={{ margin: '90px auto auto auto' }}>
            <h3 style={{ textAlign: 'center', margin: '20px auto ' }}>
              Now Playing
            </h3>
            <hr style={{ marginBottom: '20px' }} />
          </div>
          <div className="resultsWrapper">
            {movies.map(movie => (
              <Card key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ backgroundColor: 'rgb(29,29,29)' }}>
        <div style={resultsContainer}>
          <div>
            <div className="lds-dual-ring" />
          </div>
        </div>
      </div>
    );
  }
}
