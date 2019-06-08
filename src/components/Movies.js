import React, { useState, useEffect } from 'react';

function Movies(props) {
  const API_KEY = process.env.REACT_APP_API;
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log(search);
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
  };

  const handleSearch = e => setSearch(e.target.value);
  return (
    <div>
      <input
        className="searchBar"
        placeholder="Search for Movies"
        onChange={handleSearch}
      />
      {movies.map(movie => (
        <h2>{movie.title}</h2>
      ))}
    </div>
  );
}

export default Movies;
