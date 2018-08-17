import { RootStore } from './RootStore';

jest.mock('../api/MoviesApi');

describe('Root store ', async () => {
  let store;

  beforeEach( async () => {
    store = RootStore.create();
    await store.loadMovies();
    await store.loadGenres();
  });

  it('should load movies ', async () => {
    expect(store.movies.length).toBe(3)
  });

  it('should load genres ', async () => {
    expect(store.genres.length).toBe(3)
  });

  it('should set correct total page ', async () => {
    expect(store.totalPages).toBe(12)
  });

  it('should set correct page ', async () => {
    expect(store.currentPage).toBe(1)
  });

  it('should select correct genre ', async () => {
    store.selectGenre(2);
    expect(store.selectedGenres.length).toBe(1)
    expect(store.selectedGenres[0]).toBe(2)
  });

  it('should correctly filter movies by genre ', async () => {
    store.selectGenre(2);
    expect(store.moviesByGenre.length).toBe(2);
  });

  it('should sort movies by rating ', async () => {
    store.setRating(6);
    const moviesByRating = store.moviesFilteredByrating;
    expect(moviesByRating.length).toBe(2);
    expect(moviesByRating[0].id).toBe(489928);
    expect(moviesByRating[1].id).toBe(502682);
  });

});

