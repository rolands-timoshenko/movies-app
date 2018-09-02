import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from './movieCard/MovieCard';
import { Col } from 'reactstrap';
import ReactLoading from 'react-loading';
class MovieListing extends Component {

  getGenreString = (genreIds) => {
    return this.props.genres
      .filter(genre => genreIds.includes(genre.id))
      .map(genre => genre.name)
      .join(", ");
  }

  render() {
    return this.props.loading 
      ? <ReactLoading type="bubbles" color="grey" style={{margin: 'auto', width: 64, height: 64}} /> 
      : this.props.movies.map(movie => (
      <Col key={movie.id} xs="12" sm="6" md="4" lg="3">
        <MovieCard movie={movie} getGenreString={this.getGenreString}  />
      </Col>
    ));
  }
};

MovieListing.propTypes = {
  movies: PropTypes.array.isRequired,
  genres: PropTypes.array.isRequired,
  loading: PropTypes.bool
};

export { MovieListing }