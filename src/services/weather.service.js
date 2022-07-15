import { ResourceTypes, ApiKey, IsProduction } from '../utils/constants';
const sampleCurrConditions = require('../data/sample-currentConditions.json');
const sampleDailyForecast = require('../data/sample-fiveDayJeru.json');
const sampleSearchResults = require('../data/sample-autocomplete.json');

const BASE_URL = 'http://dataservice.accuweather.com/';

export const weatherService = {
  getCurrentConditions,
  getDailyForecast,
  getSearchResults,
};

async function getCurrentConditions(locationKey) {
  if (IsProduction) {
    const url = `${BASE_URL}${ResourceTypes.CurrentConditions}${locationKey}?apikey=${ApiKey}`;
    const res = await _get(url);
    return res[0];
  } else {
    return sampleCurrConditions[0];
  }
}

async function getDailyForecast(locationKey) {
  if (IsProduction) {
    const url = `${BASE_URL}${ResourceTypes.FiveDays}${locationKey}?apikey=${ApiKey}&metric=true`;
    const res = await _get(url);
    return res;
  } else {
    return sampleDailyForecast;
  }
}
async function getSearchResults(searchBy) {
  if (IsProduction) {
    const url = `${BASE_URL}${ResourceTypes.Autocomplete}?apikey=${ApiKey}&metric=true&q=${searchBy}`;
    const res = await _get(url);
    return res;
  } else {
    const randomIdx = Math.floor(Math.random() * sampleSearchResults.length);
    return sampleSearchResults.slice(randomIdx);
  }
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
