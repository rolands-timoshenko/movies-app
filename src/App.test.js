import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';
import { GenreSelector } from './components/genreSelector/GenreSelector';
import { MovieListing } from './components/movieListing/MovieListing';
import { RootStore } from './models/RootStore';
import { Provider } from "mobx-react";
jest.mock('./api/MoviesApi');


describe('Component tests ', async () => {

  let store;

  beforeEach( async () => {
    store = RootStore.create();
  });

  it('should render correctly App cmp', async () => {
    const tree = renderer
      .create(
        <Provider rootStore={store}>
          <App />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly GenreSelector cmp', async () => {
    await store.loadMovies();
    await store.loadGenres();
    const tree = renderer
      .create(
        <GenreSelector genres={store.genres} onChange={() => {}}/>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly MovieListing cmp', async () => {
    await store.loadMovies();
    await store.loadGenres();
    const tree = renderer
      .create(
        <MovieListing movies={store.moviesFilteredByrating} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
