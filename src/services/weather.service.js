const BASE_URL = `https://rickandmortyapi.com/api`;

export const weatherService = {
  getSomething,
};

async function getSomething() {
  const url = `${BASE_URL}`;
  const res = await _get(url);
  return res[0];
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
