import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const MovieCard = observer(({movie}) => {
  const movieCardStyle = {
    margin: 10
  };
  return (
    <div style={movieCardStyle}>
      <Card>
        <CardImg top width="100%" src={movie.posterImage} alt={movie.title} />
        <CardBody>
          <CardTitle>{movie.title}</CardTitle>
          <CardSubtitle>{movie.genreNames.join(", ")}</CardSubtitle>
          <br />
          <Button>Watch</Button>
        </CardBody>
      </Card>
    </div>
  );
});

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export { MovieCard };