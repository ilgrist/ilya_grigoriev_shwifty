import { ResourceTypes } from '../utils/constants';
import { rickAndMortyApi } from './api.service';

export const rickAndMortyService = {
  getCharacterByName,
  getLocationByName,
  getCharactersByIds,
  getEmptyFilterBy,
  getEmptyCharacter,
  getChartCharacters,
  getChartDataModel,
};

async function getCharacterByName(characterName) {
  const resourceType = ResourceTypes.character;
  let filterBy = getEmptyFilterBy(resourceType);
  filterBy.name = characterName;
  const payload = { resourceType, filterBy };
  const res = await rickAndMortyApi.get(payload);
  return res;
}

async function getLocationByName(locationName) {
  const resourceType = ResourceTypes.location;
  const filterBy = rickAndMortyService.getEmptyFilterBy(resourceType);
  filterBy.name = locationName;
  const payload = { resourceType, filterBy };
  const res = await rickAndMortyApi.get(payload);
  return res;
}

async function getCharactersByIds(ids) {
  const resourceType = ResourceTypes.character;
  const payload = { resourceType, ids };
  const res = await rickAndMortyApi.getByIds(payload);
  return res;
}

function getEmptyFilterBy(resourceType) {
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

function getEmptyCharacter() {
  return {
    name: '',
    origin: '',
    dimension: '',
    popularity: '',
  };
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
