import React, { useState, useEffect } from 'react';
import Card from './MovieCard';
import Loader from '../loader.gif';

function Movies(props) {
  const API_KEY = process.env.REACT_APP_API;
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(true);
  const [res, setRes] = useState(true);

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
    console.log(search);
    setLoader(true);
    setRes(true);
    fetchitems();
  },[search]); //eslint-disable-line

  const fetchitems = async () => {
    let data;
    if (search !== '')
      data = await fetch(
        'https://api.themoviedb.org/3/search/movie?api_key=' +
          API_KEY +
          '&query=' +
          search
      );
    else
      data = await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=' +
          API_KEY +
          '&language=en-US&page=1'
      );

    const movies = await data.json();
    console.log(movies);

    const now_movies = movies.results;
    setMovies(now_movies);
    if (now_movies.length !== 0) setRes(false);
    else setRes(true);
    setLoader(false);
  };

  const handleSearch = e => setSearch(e.target.value);
  if (!loader) {
    if (!res) {
      return (
        <div style={resultsContainer}>
          <input
            className="searchBar"
            placeholder="Search for Movies"
            onChange={handleSearch}
          />
          <div style={resultsWrapper}>
            {movies.map(movie => (
              <Card key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div style={resultsContainer}>
          <input
            className="searchBar"
            placeholder="Search for Movies"
            onChange={handleSearch}
          />
          <div style={resultsWrapper}>
            <h1>No results found</h1>
          </div>
        </div>
      );
    }
  } else {
    if (!res) {
      return (
        <div style={resultsContainer}>
          <input
            className="searchBar"
            placeholder="Search for Movies"
            onChange={handleSearch}
          />
          <div>
            <img src={Loader} alt="loader" style={{ paddingTop: '20px' }} />
          </div>
        </div>
      );
    } else {
      return (
        <div style={resultsContainer}>
          <input
            className="searchBar"
            placeholder="Search for Movies"
            onChange={handleSearch}
          />
          <div style={resultsWrapper}>
            <h1>No results found</h1>
          </div>
        </div>
      );
    }
  }
}

export default Movies;
