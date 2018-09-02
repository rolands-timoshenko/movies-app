import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import './App.css';
import logo from './logo.svg';
import { filteredMovies } from './store/MoviesReducer';
import { filteredGenres } from './store/GenresReducer';
import { MovieListing } from './components/movieListing/MovieListing';
import { RatingSlider } from './components/ratingSlider/RatingSlider';
import { GenreSelector } from './components/genreSelector/GenreSelector';
import { ACTIONS } from './store/DefaultReducer';
import { loadGenresAsync } from "./store/GenresReducer";
import { loadMoviesAsync } from './store/MoviesReducer';

export class App extends Component {

  componentDidMount() {
    this.props.loadGenres();
    this.props.loadMovies();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Now playing movies</h1>
        </header>
        <Container>
          <Row>
            <RatingSlider onChange={this.props.handleOnSliderChange} value={this.props.rating} />
          </Row>
          <Row>
            <GenreSelector 
              onChange={this.props.handleSelectGenre} 
              genres={this.props.genres} 
              loading={this.props.genresLoading}
              selectedGenres={this.props.selectedGenres} />
          </Row>
          <Row>
            <MovieListing 
              loading={this.props.moviesLoading} 
              movies={this.props.movies} 
              genres={this.props.genres} />
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rating: state.app.selectedRating,
    selectedGenres: state.app.selectedGenres,
    genres: filteredGenres(state),
    movies: filteredMovies(state),
    moviesLoading: state.movies.loading,
    genresLoading: state.genres.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleOnSliderChange: val => dispatch({type: ACTIONS.SELECT_RATING, rating: val}),
    handleSelectGenre: genre =>  () => dispatch({type: ACTIONS.SELECT_GENRES, genre: genre}),
    loadGenres: () => dispatch(loadGenresAsync()),
    loadMovies: () => dispatch(loadMoviesAsync())
  }
}

const ReduxApp = connect(mapStateToProps, mapDispatchToProps)(App);

export { ReduxApp };
