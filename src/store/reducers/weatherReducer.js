const INITIAL_STATE = {
  location: null,
  currentConditions: null,
  dailyForecast: null,
  searchResults: [],
  searchBy: null,
};

export function weatherReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_LOCATION':
      return {
        ...state,
        location: action.location,
      };
    case 'SET_DAILY_FORECAST':
      return {
        ...state,
        dailyForecast: action.dailyForecast,
      };
    case 'SET_CURRENT_CONDITIONS':
      return {
        ...state,
        currentConditions: action.currentConditions,
      };
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.searchResults,
      };
    case 'SET_SEARCH_BY':
      return {
        ...state,
        searchBy: action.txt,
      };
    default:
      return state;
  }
}
