import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const MovieCard = observer((props) => {
  const movieCardStyle = {
    margin: 10
  };
  return (
    <div style={movieCardStyle}>
      <Card>
        <CardImg top width="100%" src={props.movie.posterImage} alt={props.movie.title} />
        <CardBody>
          <CardTitle>{props.movie.title}</CardTitle>
          <CardSubtitle>{props.movie.genreNames.join(", ")}</CardSubtitle>
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