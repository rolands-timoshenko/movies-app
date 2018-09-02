import api from "../api/MoviesApi";
import { createSelector } from 'reselect'
import tick from "../utils/tick";

export const ACTIONS = {
  ADD_MOVIES: "add_movies",
  SET_MOVIES_LOADING: "set_movies_loading"
};

/**
 * This action function should be called for loading data from api
 */
export const loadMoviesAsync = () => {
  return async (dispatch) => {
    try {
      dispatch({type: ACTIONS.SET_MOVIES_LOADING, loading: true});
      await tick(2000);
      const movies = await api.getPlayingMovies();
      dispatch({type: ACTIONS.ADD_MOVIES, movies: movies});
    } catch (e) {
      // Report error
      console.error(e);
    } finally {
      dispatch({type: ACTIONS.SET_MOVIES_LOADING, loading: false});
    }
  }
}

const initialState = {
  results: [],
  loading: false
};

export const MoviesReducer = (state = initialState, action) => {
  switch(action.type) {
    case ACTIONS.ADD_MOVIES: return {...state, ...action.movies};
    case ACTIONS.SET_MOVIES_LOADING: return {...state, loading: action.loading}
    default: return state;
  }
}

/**
 * Computed value. Selectors allow filter targeted state
 */
export const filteredMovies = createSelector(
  (state) => state.movies.results,
  (state) => state.app.selectedGenres,
  (state) => state.app.selectedRating,
  (movies, genres, rating) => {

    return movies
      .sort((a, b) => b.vote_average - a.vote_average)
      .filter((movie) => {
        return movie.vote_average >= rating;
      })
      .filter((movie) => {
        if (genres.length > 0) {
          return genres.every((id) => {
            return movie.genre_ids.includes(id);
          });
        } else {
          return true;
        }
      });
  }
);