import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card, CardBody, CardImg, CardSubtitle, CardTitle } from 'reactstrap';
import { MoviesApi } from '../../../api/MoviesApi';

const MovieCard = ({ movie, getGenreString }) => {

  const movieCardStyle = {
    marginBottom: 20
  };

  return (
    <div style={movieCardStyle}>
      <Card>
        <CardImg top width="100%" src={MoviesApi.imageUrl + movie.poster_path} alt={movie.title} />
        <CardBody>
          <CardTitle>{movie.title} ({movie.vote_average})</CardTitle>
          <CardSubtitle>{getGenreString(movie.genre_ids)}</CardSubtitle>
          <br />
          <Button>Watch</Button>
        </CardBody>
      </Card>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  getGenreString: PropTypes.func.isRequired
};

export { MovieCard };
