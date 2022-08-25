const BASE_URL = `https://rickandmortyapi.com/api`;

export const rickAndMortyApi = {
  get,
  getById,
  getByIds,
};

async function get(payload) {
  let res = {};
  const { resourceType, filterBy } = payload;
  const url = _buildUrlForGet(resourceType, filterBy);
  const data = await _getFromApi(url);
  res = data.results[0];
  return res;
}

async function getById(payload) {
  let res = {};
  const { resourceType, id } = payload;
  const ids = [id];
  const url = _buildUrlForGetById(resourceType, ids);
  res = await _getFromApi(url);
  return res;
}

async function getByIds(payload) {
  let res = {};
  const { resourceType, ids } = payload;
  const url = _buildUrlForGetById(resourceType, ids);
  res = await _getFromApi(url);
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
