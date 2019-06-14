import React from 'react';
import Card from './MovieCard';
import '../style/suggest.css';
const Suggestions = props => {
  const movies = props.movies;

  const resultsContainer = {
    margin: '0px 10%',
    textAlign: 'center'
  };

  return (
    <div style={{ backgroundColor: 'rgb(29,29,29)' }}>
      <div style={resultsContainer}>
        <div className="resultsWrapper">
          {movies.map(movie => {
            if (movie.poster_path !== null) {
              return <Card key={movie.id} movie={movie} />;
            } else return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
