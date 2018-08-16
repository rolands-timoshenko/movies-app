import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Col, Button } from 'reactstrap';

const GenreSelector = observer((props) => {
  return props.genres.map((genre) => {
    return (
      <Col lg="2" md="3" sm="4" xs="6" key={genre.id}>
        <Button color="primary" active={genre.isActive} style={{margin:5, width: '100%'}} onClick={props.onChange(genre.id)}>{genre.name}</Button>
      </Col>
    );
  });
});

GenreSelector.propTypes = {
  genres: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export { GenreSelector };