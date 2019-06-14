import React, { useState, useEffect } from 'react';
import Suggestions from './Suggestions';

function Movies(props) {
  const API_KEY = process.env.REACT_APP_API;
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(true);

  const searchBar = {
    padding: '10px',
    color: '#919191',
    border: 'none',
    fontSize: '0.85em',
    fontWeight: '700',
    width: '95%',
    background: 'none'
  };

  const formStyle = {
    width: '75%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    marginBottom: '30px',
    top: '10vh',
    background: '#212121',
    border: '2px solid #919191',
    borderRadius: '5px',
    position: 'fixed',
    zIndex: '9'
  };

  useEffect(() => {
    console.log(search);
    setLoader(true);
    fetchitems();
   },[search]); //eslint-disable-line

  const fetchitems = async () => {
    let data;
    if (search) {
      data = await fetch(
        'https://api.themoviedb.org/3/search/movie?api_key=' +
          API_KEY +
          '&query=' +
          search
      );
    } else {
      data = await fetch(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=' +
          API_KEY +
          '&language=en-US'
      );
    }
    const movies = await data.json();
    const now_movies = movies.results;
    console.log(movies);

    setMovies(now_movies);

    setTimeout(function() {
      setLoader(false);
    }, 2000);
  };

  const handleSearch = e => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  if (!loader && movies.length !== 0) {
    return (
      <div style={{ backgroundColor: 'rgb(29,29,29)', textAlign: 'center' }}>
        <form style={formStyle}>
          <input
            className="searchBar"
            placeholder="Search for Movies"
            onChange={handleSearch}
            style={searchBar}
          />
        </form>
        <div style={{ marginTop: '20vh' }}>
          <Suggestions movies={movies} />
        </div>
      </div>
    );
  } else if (!loader && movies.length === 0) {
    return (
      <div style={{ backgroundColor: 'rgb(29,29,29)' }}>
        <form style={formStyle}>
          <input
            className="searchBar"
            value="Search for Movies"
            onChange={handleSearch}
            style={searchBar}
            type="search"
          />
        </form>
        <div>
          <h3>No results</h3>
        </div>
      </div>
    );
  } else if (loader) {
    return (
      <div style={{ backgroundColor: 'rgb(29,29,29)' }}>
        <form style={formStyle}>
          <input
            className="searchBar"
            placeholder="Search for Movies"
            onChange={handleSearch}
            style={searchBar}
          />
        </form>
        <div>
          <div className="lds-dual-ring" />
        </div>
      </div>
    );
  }
}

export default Movies;
