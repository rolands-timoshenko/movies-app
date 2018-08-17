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

  // Get genres as Genre[]
  get genres() {
    const genres = getParentOfType(self, RootStore).genres;
    return genres.filter((genre) => {
      return self.genreIds.includes(genre.id);
    });
  },

  // This one will give us genre names as string[]
  get genreNames() {
    return self.genres.map((genre) => {
      return genre.name
    })
  },

  // Lets get full image path. genre model will have posterImage property. 
  get posterImage() {
    return `${MoviesApi.imageUrl}${self.posterPath}`;
  }
}));