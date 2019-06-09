import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import About from './components/About';
import Movies from './components/Movies';
import Home from './components/Home';
import MoviePage from './components/MoviePage';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/movies" exact component={Movies} />
          <Route path="/movies/:id" component={MoviePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
