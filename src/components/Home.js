import React, { useState, useEffect } from 'react';
import Card from './MovieCard';
import Loader from '../loader.gif';
import Search from './Movies';
export default function Home() {
  const API_KEY = process.env.REACT_APP_API;
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(true);

  const resultsWrapper = {
    display: 'grid' /* 1 */,
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    /* grid-auto-rows: 50px;  */
    gridGap: '10px' /* 4 */
    /* height: 100%; */
  };

  const resultsContainer = {
    margin: '0px 10%',
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
    setLoader(false);
  };

  if (!loader) {
    return (
      <div style={{ backgroundColor: 'rgb(29,29,29)' }}>
        <div style={resultsContainer}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginLeft: '6%',
              marginBottom: '4%',
              marginTop: '10vh',
              paddingTop: '0'
            }}
          >
            <h3 style={{ textAlign: 'left', marginRight: '400px' }}>
              Now Playing
            </h3>
            <Search />
          </div>
          <div style={resultsWrapper}>
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
            <img src={Loader} alt="loader" style={{ paddingTop: '20px' }} />
          </div>
        </div>
      </div>
    );
  }
}
