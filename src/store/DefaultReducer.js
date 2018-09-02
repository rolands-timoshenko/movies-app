export const ACTIONS = {
  SELECT_RATING: "select_rating",
  SELECT_GENRES: "select_genres"
};

const initialState = {
  selectedRating: 3,
  selectedGenres: []
}

export const DefaultReducer = (state = initialState, action) => {
  switch(action.type) {

    case ACTIONS.SELECT_RATING:
      return {...state, selectedRating: action.rating};

    case ACTIONS.SELECT_GENRES:
      const selectedGenres = state.selectedGenres;
      let newSelectedGenres = [];
      if (selectedGenres.includes(action.genre)) {
        newSelectedGenres = selectedGenres.filter((genre) => {
          return genre !== action.genre;
        });
      } else {
        newSelectedGenres = [...selectedGenres, action.genre];
      }
      return {...state, selectedGenres: newSelectedGenres};

    default:
      return state;
      
  }
}