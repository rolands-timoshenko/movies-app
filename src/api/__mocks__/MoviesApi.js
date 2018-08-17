import { data as movies } from "./MoviesData" 

export default class MoviesApi {
  
  async getPlayingMovies(page = 1) {
    try {
      return {
        results: movies,
        page: 1,
        total_results: 120,
        total_pages: 12
      };
    } catch (e) {
      console.error(e);
    }
  }

  async getMovieGenres() {
    try {
      return [
        {
          id: 1,
          name: "Action"
        },
        {
          id: 2,
          name: "Adventure"
        },
        {
          id: 3,
          name: "Western"
        }
      ];
    } catch (e) {
      console.error(e);
    }
  }
}