import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { observer } from 'mobx-react';

class App extends Component {

  componentDidMount() {
    this.props.store.loadMovies();
    this.props.store.loadGenres();
  }

  pages = () => {
    return Array.from(Array(this.props.store.totalPages).keys())
  }

  showNext = () => {
    return (this.props.store.totalPages > this.props.store.currentPage) ? <button onClick={this.props.store.loadNext}>Next</button> : null;
  }

  showPrev = () => {
    return (this.props.store.currentPage !== 1) ? <button onClick={this.props.store.loadPrev}>Prev</button> : null;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Movie listing app</h1>
          <p>Total/Current: {this.props.store.totalPages} | {this.props.store.currentPage}</p>
        </header>
        <ul>
          {this.props.store.moviesByPopularity.map((movie) =>
            (
              <li key={movie.id}>
                <img style={{width: 100}} src={movie.posterImage} />
                {movie.title} {movie.popularity}
              </li>
            )
          )}
        </ul>
        {this.showPrev()}
        {this.showNext()}
      </div>
    );
  }
}

export default observer(App);
