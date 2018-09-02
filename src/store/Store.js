import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { GenreReducer } from "./GenresReducer";
import { MoviesReducer } from "./MoviesReducer";
import { DefaultReducer } from "./DefaultReducer";

// Redux devtool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// This middleware give us a posibility to make async actions like api call
const asyncActionMiddleWare = store => next => action => {
  if (typeof action === "function") {
    action(next);
  } else {
    next(action);
  }
}

const customMiddleWare = composeEnhancers(applyMiddleware(asyncActionMiddleWare));

// This redux configuration function will return createStore func
export const configureStore = () => {
  return createStore(combineReducers({
    app: DefaultReducer,
    genres: GenreReducer,
    movies: MoviesReducer
  }), customMiddleWare );
}