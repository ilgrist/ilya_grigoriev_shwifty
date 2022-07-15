import { storageService } from './async-storage.service';
import { utilService } from './util.service';

const FAVORITE_KEY = 'favorites';

export const favoriteService = {
  query,
  remove,
  save,
  getById,
  getEmptyFavorite,
};

async function query() {
  let favorites = await storageService.query(FAVORITE_KEY);
  return favorites;
}

async function getById(favoriteId) {
  const favorite = await storageService.get(FAVORITE_KEY, favoriteId);
  return favorite;
}

async function save(favorite) {
  const favoriteToSave = JSON.parse(JSON.stringify(favorite));
  const savedFavorite = favoriteToSave._id
    ? await storageService.put(FAVORITE_KEY, favoriteToSave)
    : await storageService.post(FAVORITE_KEY, favoriteToSave);
  return savedFavorite;
}

async function remove(favoriteId) {
  await storageService.remove(FAVORITE_KEY, favoriteId);
}

function getEmptyFavorite() {
  return { location: '', currentConditions: '', dailyForecast: '' };
}
