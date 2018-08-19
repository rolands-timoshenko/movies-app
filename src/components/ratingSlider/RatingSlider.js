import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';

export const RatingSlider = observer(({value, onChange}) => {

  const sliderWrapperStyle = {
    margin: 20,
    padding: 10,
    textAlign: 'left'
  }

  const sliderStyle = {
    width: '100%'
  };

  const sliderMarks = {
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10' 
  }

  return (
    <Col style={sliderWrapperStyle}>
      <h4>Select movie rating from 0 - 10</h4>
      <Slider 
        style={sliderStyle}
        onChange={onChange} 
        min={0} 
        max={10} 
        marks={sliderMarks} 
        step={0.5}
        value={value} />
    </Col>
  );
});

RatingSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};