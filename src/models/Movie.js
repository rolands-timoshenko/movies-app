import { types, getParentOfType } from 'mobx-state-tree';
import MoviesApi from '../api/MoviesApi';
import { RootStore } from './RootStore';

export const Movie = types.model("Movie", {
  id: types.number,
  title: types.string,
  posterPath: types.maybeNull(types.string),
  popularity: types.number,
  voteAverage: types.number,
  genreIds: types.array(types.number)
})
// Computed values
.views(self => ({

  get genres() {
    const genres = getParentOfType(self, RootStore).genres;
    return genres.filter((genre) => {
      return self.genreIds.includes(genre.id);
    });
  },

  get genreNames() {
    return self.genres.map((genre) => {
      return genre.name
    })
  },

  // Lets get full image path just directly form Movie model
  get posterImage() {
    return `${MoviesApi.imageUrl}${self.posterPath}`;
  }
}));