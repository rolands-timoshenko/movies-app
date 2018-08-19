import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { MovieCard } from './movieCard/MovieCard';
import { Col } from 'reactstrap';

const MovieListing = observer(({movies}) => {
  return movies.map( movie => (
      <Col key={movie.id} xs="12" sm="6" md="4" lg="3">
        <MovieCard movie={movie} />
      </Col>
  ) );
});

MovieListing.propTypes = {
  movies: PropTypes.array.isRequired
};

export { MovieListing }