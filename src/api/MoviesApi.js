import axios from 'axios';

export default class MoviesApi {
  
  static apiUrl = "https://api.themoviedb.org/";
  static apiKey = "8b8ec78e1057439660f2e05f803987e2";
  static imageUrl = "https://image.tmdb.org/t/p/w500/";

  async getPlayingMovies(page = 1) {
    try {
      const resp = await axios.get(`${MoviesApi.apiUrl}3/movie/now_playing?api_key=${MoviesApi.apiKey}&language=en-US&page=${page}`);
      return resp.data;
    } catch (e) {
      console.error(e);
    }
  }

  async getMovieGenres() {
    try {
      const resp = await axios.get(`${MoviesApi.apiUrl}3/genre/movie/list?api_key=${MoviesApi.apiKey}&language=en-US`);
      return resp.data.genres;
    } catch (e) {
      console.error(e);
    }
  }
}