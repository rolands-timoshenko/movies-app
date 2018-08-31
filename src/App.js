import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import { About } from './components/about/About';
import { AppNavbar } from './components/appNavbar/AppNavbar';
import { Header } from './components/header/Header';
import NowPlayingMovies from './components/nowPlayingMovies/NowPlayingMovies';

export class App extends Component {

  rootStore;
  // To add ability load more movies set to true
  showLoadMore = false;

  // constructor(props) {
  //   super(props);
  //   // Set shorter access to root store
  //   this.rootStore = this.props.rootStore;
  // }

  componentDidMount() {
    // Lets load movies and genres 
    // this.rootStore.loadMovies();
    // this.rootStore.loadGenres();
  }

  // Show Load More button if there are more pages with movies.
  // loadMore = () => {
  //   return (this.rootStore.totalPages > this.rootStore.currentPage)
  //     ? <Button color="primary" onClick={this.rootStore.loadNext}>Load More</Button> : null;
  // }

  // // On cmp render function will be called and id will be saved in closure
  // handleSelectGenre = (id) => {
  //   // Returning onChange handler. Using preserve id
  //   return () => {
  //     this.rootStore.selectGenre(id);
  //   }
  // }

  // // On slider change lets update store
  // handleOnSliderChange = (val) => {
  //   this.rootStore.setRating(val);
  // }

  render() {

    return (
      <div className="App">
        <AppNavbar title="Now Playing movies" />
        <Header />
        <Switch>
          <Route path="/about" component={About} />
          <Route exact={true} path="/" component={NowPlayingMovies} />
        </Switch>
      </div>
    );
  }
}
// Inject allow us to access store through props. Also child cmp can access rootStore through inject. 
// No need for making props chainprops chain. Plus lets decorate App cmp with mobx observer
export default inject('rootStore')(withRouter(observer(App)));
