import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button } from 'reactstrap';
import ReactLoading from 'react-loading';

const GenreSelector = ({genres, onChange, selectedGenres, loading}) => {
  
  const buttonStyle = {
    marginBottom:20, 
    width: '100%'
  };

  return loading 
    ? <ReactLoading type="bubbles" color="grey" style={{margin: 'auto', width: 64, height: 64}} /> 
    : genres.map((genre) => {
    const isActive = selectedGenres.includes(genre.id);
    return (
      <Col lg="2" md="3" sm="4" xs="6" key={genre.id}>
        <Button color={isActive ? "primary": "secondary"} active={isActive} style={buttonStyle} onClick={onChange(genre.id)}>{genre.name}</Button>
      </Col>
    );
  });
};

GenreSelector.propTypes = {
  genres: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedGenres: PropTypes.array.isRequired,
  loading: PropTypes.bool
};

export { GenreSelector };