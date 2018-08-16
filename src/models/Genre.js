import { types, getParentOfType } from 'mobx-state-tree';
import { RootStore } from './RootStore';

export const Genre = types.model("Genre", {
  id: types.number,
  name: types.string
})

.views(self => ({
  get isActive() {
    const genres = getParentOfType(self, RootStore).selectedGenres;
    return genres.includes(self.id);
  }
}));