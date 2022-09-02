import { ResourceTypes } from '../utils/constants';
import { rickAndMortyApi } from './api.service';
import { localStorageService } from './async-storage.service';

export const rickAndMortyService = {
  getResourceByName,
  getResourceByIds,
  getChartCharacters,
  getChartDataModel,
  prepCharToDisplay,
};

async function getResourceByName(resourceType = ResourceTypes.character, name = '') {
  let res = await localStorageService.getByName(resourceType, name);
  if (!res) {
    const filterBy = _getEmptyFilterBy(resourceType);
    filterBy.name = name;
    const payload = { resourceType, filterBy };
    res = await rickAndMortyApi.get(payload);
    return await localStorageService.post(resourceType, res);
  } else {
    return res;
  }
}

async function getResourceByIds(resourceType, ids) {
  const payload = { resourceType, ids };
  const res = await rickAndMortyApi.getByIds(payload);
  return res;
}

function _getEmptyFilterBy(resourceType) {
  switch (resourceType) {
    case ResourceTypes.location:
      return {
        name: '',
        type: '',
        dimension: '',
      };
    case ResourceTypes.character:
      return {
        name: '',
        status: '',
        species: '',
        type: '',
        gender: '',
      };
    case ResourceTypes.episode:
      return {
        name: '',
        episode: '',
      };
  }
}

function getChartCharacters() {
  return ['Rick Sanchez', 'Summer Smith', 'Morty Smith', 'Beth Smith', 'Jerry Smith'];
}

function getChartDataModel() {
  return {
    title: '',
    axis: {
      x: '',
      y: '',
    },
    data: [],
  };
}

function prepCharToDisplay(char, location) {
  const name = char.name;
  const origin = char.origin.name;
  const popularity = char.episode.length;
  const dimension = location.dimension;
  return { name, origin, popularity, dimension };
}
