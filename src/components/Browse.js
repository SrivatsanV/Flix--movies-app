import React, { useState, useEffect } from 'react';
import Suggestions from './Suggestions';
import Loader from '../loader.gif';

function Browse(props) {
  const API_KEY = process.env.REACT_APP_API;
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    console.log(search);
    setLoader(true);
    fetchitems();
   },[search]); //eslint-disable-line

  const fetchitems = async () => {
    let data, movies, now_movies;
    if (search) {
      data = await fetch(
        'https://api.themoviedb.org/3/search/movie?api_key=' +
          API_KEY +
          '&query=' +
          search
      );
      movies = await data.json();
      now_movies = movies.results;
    } else {
      now_movies = [];
    }
    console.log(movies);

    setMovies(now_movies.slice(0, 5));

    setLoader(false);
  };

  const handleSearch = e => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const searchBar = {
    width: '300px',
    overflow: 'hidden'
  };
  if (!loader && movies.length !== 0) {
    return (
      <form>
        <input
          className="searchBar"
          placeholder="Search for Movies"
          onChange={handleSearch}
          style={searchBar}
        />
        <Suggestions movies={movies} />
      </form>
    );
  } else if (!search) {
    return (
      <form>
        <input
          className="searchBar"
          placeholder="Search for Movies"
          onChange={handleSearch}
          style={searchBar}
        />
        <div>
          <h1>Enter</h1>
        </div>
      </form>
    );
  } else if (search && movies.length === 0) {
    return (
      <form>
        <input
          className="searchBar"
          placeholder="Search for Movies"
          onChange={handleSearch}
          style={searchBar}
        />
        <div>
          <h1>No results</h1>
        </div>
      </form>
    );
  } else {
    return (
      <form>
        <input
          className="searchBar"
          placeholder="Search for Movies"
          onChange={handleSearch}
          style={searchBar}
        />
        <div>
          <img src={Loader} alt="loader" style={{ paddingTop: '20px' }} />
        </div>
      </form>
    );
  }
}

export default Browse;
