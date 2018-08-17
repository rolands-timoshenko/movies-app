import { types } from 'mobx-state-tree';
import MoviesApi from '../api/MoviesApi';
import { Movie } from './Movie';
import { Genre } from './Genre';

// Main store model
export const RootStore = types.model("Movies", {
  totalPages: types.maybe(types.number),
  currentPage: types.maybe(types.number),
  movies: types.array(Movie),
  genres: types.array(Genre),
  selectedGenres: types.array(types.number),
  selectedRating: types.optional(types.number, 3)
})

// Computed values
.views(self => ({

  // Movies will be sorted by popularity. Lets use slice, so we are not modifying original one.
  get moviesByPopularity() {
    return self.movies.slice().sort((a, b) => {
      return b.popularity - a.popularity;
    });
  },

  // Movies will be filtered by genre if such selected
  get moviesByGenre() {
    if (self.selectedGenres.length > 0) {
      return self.moviesByPopularity.filter((movie) => {
        return self.selectedGenres.every((id) => {
          return movie.genreIds.includes(id);
        });
      }) 
    }
    return self.moviesByPopularity;
  },

  // Movies will be sorted by selected rating and higher
  get moviesFilteredByrating() {
    return self.moviesByGenre.sort((a, b) => b.voteAverage - a.voteAverage).filter((movie) => {
      return movie.voteAverage >= self.selectedRating;
    });
  }

}))
// Actions are for interacting with store
.actions(self => {

  // Set api instance
  const api = new MoviesApi();

  // Return public methods
  return {

    // This one will load movies from api and will spread properties to store
    async loadMovies(page = 1) {
      const data = await api.getPlayingMovies(page);
      self.setTotalPages(data.total_pages);
      self.setMovies(data.results);
      self.setCurrentPage(data.page);
    },

    // Will load genres from api and spread them into store
    async loadGenres() {
      const genres = await api.getMovieGenres();
      self.setGenres(genres);
    },

    loadNext() {
      self.loadMovies(self.currentPage + 1);
    },

    setTotalPages(pages) {
      self.totalPages = pages;
    },

    setCurrentPage(page) {
      self.currentPage = page;
    },

    // movies will be pushed into store
    setMovies(movies) {
      movies.map((movie) => {
        return self.movies.push(Movie.create({
          id: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
          popularity: movie.popularity,
          voteAverage: movie.vote_average,
          genreIds: movie.genre_ids
        }));
      });
    },

    // Will set rating
    setRating(val) {
      if (self.selectedRating !== val) {
        self.selectedRating = val;
      }
    },

    // Saving genres inside store
    setGenres(genres) {
      genres.map((genre) => {
        return self.genres.push(Genre.create({
          id: genre.id,
          name: genre.name
        }));
      });
    },

    // Will check if genre already exists in selectedGenres[] if so, item will be removed
    selectGenre(id) {
      if (self.selectedGenres.includes(id)) {
        const newSelectedGenres = self.selectedGenres.filter((genreId) => {
          return genreId !== id;
        });
        self.selectedGenres = [...newSelectedGenres];
      } else {
        self.selectedGenres.push(id);
      }
    }

  }
});