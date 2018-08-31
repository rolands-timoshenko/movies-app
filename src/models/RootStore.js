import { types } from 'mobx-state-tree';
import MoviesApi from '../api/MoviesApi';
import { Movie } from './Movie';
import { Genre } from './Genre';

const ERROR = {
  NOTHING_TO_LOAD: 0
}

// Main store model
export const RootStore = types.model("Movies", {
  totalPages: types.maybe(types.number),
  currentPage: types.maybe(types.number),
  movies: types.array(Movie),
  genres: types.array(Genre),
  selectedGenres: types.array(types.number),
  selectedRating: types.optional(types.number, 3),
  loadingMovies: types.optional(types.boolean, false),
  nothingToLoad: types.optional(types.boolean, false)
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
  },

  // Get actual genres. If only there is movie with such genre
  get actualGenres() {

    // Lets get all actual genre ids.
    // Later it will be used for filtering genres
    const genreIds = self.moviesFilteredByrating
      .map(movie => movie.genreIds)
      .reduce((col, curr) => [...new Set([...col, ...curr])], []);
    return self.genres.slice().filter((genre) => {
      return genreIds.includes(genre.id);
    });
  }

}))
// Actions are for interacting with store
.actions(self => {

  // Set api instance
  const api = new MoviesApi();

  function spreadData(data) {
    self.setTotalPages(data.total_pages);
    self.setMovies(data.results);
    self.setCurrentPage(data.page);
  }

  // Return public methods
  return {

    // This one will load movies from api and will spread properties to store
    async loadMovies(page = 1) {
      if (self.nothingToLoad) {
        return;
      }
      try {
        self.setLoadingMovies(true);
        const data = await api.getPlayingMovies(page);
        if (data.results.length < 1 || data.total_results === self.movies.length) {
          throw new Error(ERROR.NOTHING_TO_LOAD);
        }
        spreadData(data);
        self.setLoadingMovies(false);
      } catch (e) {
        
        switch (e.message) {
          case ERROR.NOTHING_TO_LOAD:
            self.setNothingToLoad(true);
            break;

          default:
            throw e;
        }
      } finally {
        self.setLoadingMovies(false);
      }
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
      movies.forEach((movie) => {
        // push new movie into store
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

    setNothingToLoad(bool) {
      self.nothingToLoad = bool;
    },

    setLoadingMovies(bool) {
      self.loadingMovies = bool;
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