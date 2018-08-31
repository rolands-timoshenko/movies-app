import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { GenreSelector } from '../genreSelector/GenreSelector';
import { MovieListing } from '../movieListing/MovieListing';
import { RatingSlider } from '../ratingSlider/RatingSlider';



class NowPlayingMovies extends Component {

  rootStore = this.props.rootStore;

  componentDidMount() {
    // Lets load movies and genres 
    this.rootStore.loadMovies();
    this.rootStore.loadGenres();
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    if (
      ((window.innerHeight + window.scrollY) === document.body.offsetHeight) 
      && !this.rootStore.loadingMovies && !this.rootStore.nothingToLoad
    ) {
      this.rootStore.loadNext();
    }
  }

  // Show Load More button if there are more pages with movies.
  // loadMore = () => {
  //   return (this.rootStore.totalPages > this.rootStore.currentPage)
  //     ? <Button color="primary" onClick={this.rootStore.loadNext}>Load More</Button> : null;
  // }

  // On cmp render function will be called and id will be saved in closure
  handleSelectGenre = (id) => {
    // Returning onChange handler. Using preserve id
    return () => {
      this.rootStore.selectGenre(id);
    }
  }

  // On slider change lets update store
  handleOnSliderChange = (val) => {
    this.rootStore.setRating(val);
  }

  render() {
    return (
      <Container>
        <Row>
          <RatingSlider onChange={this.handleOnSliderChange} value={this.rootStore.selectedRating} />
        </Row>
        <Row>
          <GenreSelector onChange={this.handleSelectGenre} genres={this.rootStore.actualGenres} />
        </Row>
        <Row>
          <MovieListing movies={this.rootStore.moviesFilteredByrating} />
        </Row>
        {this.showLoadMore ? <Row>
          <Col>
            {this.loadMore()}
          </Col>
        </Row> : null}
      </Container>
    );
  };
}

export default inject('rootStore')(observer(NowPlayingMovies));