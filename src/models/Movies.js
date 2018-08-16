import { types } from 'mobx-state-tree';
import MoviesApi from '../api/MoviesApi';

const Genres = types.model("Genres", {
  id: types.number,
  name: types.string
});

// Movie model
const Movie = types.model("Movie", {
  id: types.number,
  title: types.string,
  posterPath: types.maybeNull(types.string),
  popularity: types.number,
  voteAverage: types.number
})
.views(self => ({
  get posterImage() {
    return `${MoviesApi.imageUrl}${self.posterPath}`;
  }
}));

// Main store model
const MovieStore = types.model("Movies", {
  totalPages: types.maybe(types.number),
  currentPage: types.maybe(types.number),
  movies: types.array(Movie),
  genres: types.array(Genres)
})

// Computed values
.views(self => ({
  get moviesByPopularity() {
    return self.movies.sort((a, b) => {
      return b.popularity - a.popularity;
    });
  }
}))
// Actions are for interacting with store
.actions(self => {

  // Set api instance
  const api = new MoviesApi();

  // Return public methods
  return {

    async loadMovies(page = 1) {
      self.movies = [];
      const data = await api.getPlayingMovies(page);
      self.setTotalPages(data.total_pages);
      self.setMovies(data.results);
      self.setCurrentPage(data.page);
    },

    async loadGenres() {
      const genres = await api.getMovieGenres();
      self.setGenres(genres);
    },

    loadNext() {
      self.loadMovies(self.currentPage + 1);
    },

    loadPrev() {
      self.loadMovies(self.currentPage - 1);
    },

    setTotalPages(pages) {
      self.totalPages = pages;
    },

    setCurrentPage(page) {
      self.currentPage = page;
    },

    setMovies(movies) {
      movies.map((movie) => {
        self.movies.push(Movie.create({
          id: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
          popularity: movie.popularity,
          voteAverage: movie.vote_average
        }));
      });
    },

    setGenres(genres) {
      genres.map((genre) => {
        self.genres.push(Genres.create({
          id: genre.id,
          name: genre.name
        }));
      });
    }
  }
});

export default MovieStore;