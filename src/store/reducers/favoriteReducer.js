const INITIAL_STATE = {
  favorites: [],
  favorite: null,
};
export function favoriteReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: action.favorites,
      };
    case 'SET_FAVORITE':
      return {
        ...state,
        currFavorite: action.favorite,
      };
    case 'SET_FILTER_BY':
      return {
        ...state,
        filterBy: action.filterBy,
      };
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.favorite],
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter((favorite) => favorite.id !== action.favoriteId),
      };
    case 'UPDATE_FAVORITE':
      return {
        ...state,
        favorites:
          state.favorites &&
          state.favorites.map((favorite) =>
            favorite.id === action.favorite.id ? action.favorite : favorite
          ),
      };
    default:
      return state;
  }
}
