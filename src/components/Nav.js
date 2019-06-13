import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div>
      <nav className="navBar sticky">
        <Link to="/" className="navLink">
          <h2>Flix</h2>
        </Link>
        <ul className="navList">
          <li>
            <Link to="/about" className="navLink">
              About
            </Link>
          </li>
          <li>
            <Link to="/movies" className="navLink">
              Movies
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
