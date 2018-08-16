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

  get moviesByPopularity() {
    return self.movies.sort((a, b) => {
      return b.popularity - a.popularity;
    });
  },

  get moviesByGenre() {
    if (self.selectedGenres.length > 0) {
      return self.moviesByPopularity.filter((movie) => {
        return movie.genreIds.some((id) => {
          return self.selectedGenres.includes(id);
        });
      }) 
    }
    return self.moviesByPopularity;
  },

  get moviesFilteredByrating() {
    return self.moviesByGenre.filter((movie) => {
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

    async loadMovies(page = 1) {
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
          voteAverage: movie.vote_average,
          genreIds: movie.genre_ids
        }));
      });
    },

    setRating(val) {
      self.selectedRating = val;
    },

    setGenres(genres) {
      genres.map((genre) => {
        self.genres.push(Genre.create({
          id: genre.id,
          name: genre.name
        }));
      });
    },

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