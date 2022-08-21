import targetLocation from '../data/earth-c-137.json';
import targetCharacters from '../data/characters.json';
import { BASE_URL, isProduction } from '../utils/constants';

export const rickAndMortyApi = {
  getLocationByName,
  getCharactersByIds,
};

async function getLocationByName(locationName = '') {
  let res = {};
  if (isProduction) {
    const url = `${BASE_URL}/location/?name=${locationName}`;
    res = await _get(url);
  } else {
    res = targetLocation;
  }
  return res;
}

async function getCharactersByIds(characters = []) {
  let res = {};
  if (isProduction) {
    const url = `${BASE_URL}/character/${characters.toString()}`;
    res = await _get(url);
  } else {
    res = targetCharacters;
  }
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
