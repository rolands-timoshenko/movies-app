import api from "../api/MoviesApi";
import { createSelector } from 'reselect'
import { filteredMovies } from './MoviesReducer';
import tick from '../utils/tick';

export const ACTIONS = {
  ADD_GENRES: "add_genres",
  SET_GENRES_LOADING: "set_genres_loading"
};

export const loadGenresAsync = () => {
  return async (dispatch) => {
    try {
      dispatch({type: ACTIONS.SET_GENRES_LOADING, loading: true});
      await tick(4000);
      const genres = await api.getMovieGenres();
      dispatch({type: ACTIONS.ADD_GENRES, genres: genres});
    } catch (error) {
      // Report error
      console.error(error);
    } finally {
      dispatch({type: ACTIONS.SET_GENRES_LOADING, loading: false});
    }
  }
}

const initialState = {
  results: [],
  loading: false
}

export const GenreReducer = (state = initialState, action) => {
  switch(action.type) {
    case ACTIONS.ADD_GENRES: return {...state, results: action.genres};
    case ACTIONS.SET_GENRES_LOADING: return {...state, loading: action.loading}
    default: return state;
  }
};

export const filteredGenres = createSelector(
  (state) => state.genres.results,
  (state) => filteredMovies(state),
  (genres, movies) => {
    const genreIds = movies
      .map(movie => movie.genre_ids)
      .reduce((col, curr) => [...new Set([...col, ...curr])], []);

    return genres.slice().filter((genre) => {
      return genreIds.includes(genre.id);
    });
  }
);