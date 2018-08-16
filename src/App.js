import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { observer, inject } from 'mobx-react';
import { RatingSlider } from './components/ratingSlider/RatingSlider';
import { GenreSelector } from './components/genreSelector/GenreSelector';
import { MovieListing } from './components/movieListing/MovieListing';
import { Button, Container, Row, Col } from 'reactstrap';

export class App extends Component {

  rootStore;

  constructor(props) {
    super(props);
    // Set shorter access to root store
    this.rootStore = this.props.rootStore;
  }

  componentDidMount() {
    // Lets load movies and genres 
    this.rootStore.loadMovies();
    this.rootStore.loadGenres();
  }

  // Show Load More button if there are more pages with movies.
  showLoadMore = () => {
    return (this.rootStore.totalPages > this.rootStore.currentPage)
      ? <Button color="primary" onClick={this.rootStore.loadNext}>Load More</Button> : null;
  }

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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Movie listing app</h1>
        </header>
        <Container>
          <Row>
            <RatingSlider onChange={this.handleOnSliderChange} value={this.rootStore.selectedRating} />
          </Row>
          <Row>
            <GenreSelector onChange={this.handleSelectGenre} genres={this.rootStore.genres} />
          </Row>
          <Row>
            <MovieListing movies={this.rootStore.moviesFilteredByrating} />
          </Row>
          <Row>
            <Col>
              {this.showLoadMore()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
// Inject allow us to access store through props. Also child cmp can access rootStore through inject. 
// No need for making props chainprops chain. Plus lets decorate App cmp with mobx observer
export default inject('rootStore')(observer(App));
