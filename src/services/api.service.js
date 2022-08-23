import targetLocation from '../data/earth-c-137.json';
import targetCharacters from '../data/characters.json';
import allCharacters from '../data/allCharacters.json';
import { BASE_URL, isProduction } from '../utils/constants';

export const rickAndMortyApi = {
  get,
  getById,
  getByIds,
};

async function get(payload) {
  let res = {};
  if (isProduction) {
    const { resourceType, filterBy } = payload;
    const url = _buildUrlForGet(resourceType, filterBy);
    const data = await _getFromApi(url);
    res = data.results;
  } else {
    res = allCharacters;
  }
  return res;
}

async function getById(payload) {
  let res = {};
  if (isProduction) {
    const { resourceType, id } = payload;
    const ids = [id];
    const url = _buildUrlForGetById(resourceType, ids);
    res = await _getFromApi(url);
  } else {
    res = allCharacters;
  }
  return res;
}

async function getByIds(payload) {
  let res = {};
  if (isProduction) {
    const { resourceType, ids } = payload;
    const url = _buildUrlForGetById(resourceType, ids);
    res = await _getFromApi(url);
  } else {
    res = allCharacters;
  }
  return res;
}

function _buildUrlForGetById(resourceType, ids) {
  const url = `${BASE_URL}/${resourceType}/${ids.toString()}`;
  return url;
}

function _buildUrlForGet(resourceType, filterBy) {
  let queryStr = '';
  if (filterBy) {
    queryStr += '?';
    for (const property in filterBy) {
      if (filterBy[property]) queryStr += `${property}=${filterBy[property]}`;
    }
  }
  const url = `${BASE_URL}/${resourceType}/${queryStr}`;
  return url;
}

// async function getCharacters() {
//   let res = {};
//   if (isProduction) {
//     const url = `${BASE_URL}/character/}`;
//     res = await _getFromApi(url);
//   } else {
//     res = allCharacters;
//   }
//   return res;
// }

// async function getLocationByName(locationName = '') {
//   let res = {};
//   if (isProduction) {
//     const url = `${BASE_URL}/location/?name=${locationName}`;
//     res = await _getFromApi(url);
//   } else {
//     res = targetLocation;
//   }
//   return res;
// }

// async function getCharactersByIds(characters = []) {
//   let res = {};
//   if (isProduction) {
//     const url = `${BASE_URL}/character/${characters.toString()}`;
//     res = await _getFromApi(url);
//   } else {
//     res = targetCharacters;
//   }
//   return res;
// }

async function _getFromApi(url) {
  try {
    const res = await fetch(url, { method: 'GET' });
    return res.json();
  } catch (error) {
    console.log(`Had issues getting results from url: ${url}`);
    console.dir(error);
    throw error;
  }
}
