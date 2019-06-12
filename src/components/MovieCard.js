import React from 'react';
import { Link } from 'react-router-dom';
import '../style/card.css';
class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { load: false };
  }

  render() {
    const movie = this.props.movie;
    const poster_src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    // //const genres = this.props.genres;
    // let genre;
    // if (movie.genre_ids.length === 0) genre = { name: '' };
    // else genre = genres.find(genre => genre.id === movie.genre_ids[0]);

    return (
      <div key={movie.id}>
        <div className="outer-wrap">
          <div className="wrapperCard">
            <img
              src={poster_src}
              width="100%"
              id="dagger"
              alt="poster"
              onLoad={this.handleImageChange}
              onError={this.handleImageChange}
            />
            <div className=" content" id="poster">
              <i className="fas fa-star" />
              <h2>{movie.vote_average}/10</h2>
              <Link key={movie.id} to={`/movies/${movie.id}`} className="view">
                View
              </Link>
            </div>
          </div>
          <div className="text-wrap">
            <p className="titleCard">{movie.title}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
