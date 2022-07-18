import { ResourceTypes, ApiKey } from '../utils/constants';

const BASE_URL =
  REACT_APP_NODE_ENV !== 'development'
    ? 'https://dataservice.accuweather.com/'
    : '//localhost:3000/api/weather';

export const weatherService = {
  getCurrentConditions,
  getDailyForecast,
  getSearchResults,
};

async function getCurrentConditions(locationKey) {
  const url = `${BASE_URL}${ResourceTypes.CurrentConditions}${locationKey}?apikey=${ApiKey}`;
  const res = await _get(url);
  return res[0];
}

async function getDailyForecast(locationKey) {
  const url = `${BASE_URL}${ResourceTypes.FiveDays}${locationKey}?apikey=${ApiKey}&metric=true`;
  const res = await _get(url);
  return res;
}

async function getSearchResults(searchBy) {
  const url = `${BASE_URL}${ResourceTypes.Autocomplete}?apikey=${ApiKey}&metric=true&q=${searchBy}`;
  const res = await _get(url);
  return res;
}

async function _get(url) {
  try {
    const res = await fetch(url, { method: 'GET' });
    return res.json();
  } catch (error) {
    console.log(`Had issues getting accuWeather results, url: ${url}`);
    console.dir(error);
    throw error;
  }
}
