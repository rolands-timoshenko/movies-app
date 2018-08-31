import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const MovieCard = observer(({movie}) => {
  
  const movieCardStyle = {
    marginBottom: 20
  };

  return (
    <div style={movieCardStyle}>
      <Card>
        <CardImg top width="100%" src={movie.posterImage} alt={movie.title} />
        <CardBody>
          <CardTitle>{movie.title} ({movie.voteAverage})</CardTitle>
          <CardSubtitle>{movie.genreNames.join(", ")}</CardSubtitle>
          <br />
          <Button>More</Button>
        </CardBody>
      </Card>
    </div>
  );
});

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export { MovieCard };