import { ResourceTypes } from '../utils/constants';
import { rickAndMortyApi } from './api.service';

export const rickAndMortyService = {
  getCharacterByName,
  getEmptyFilterBy,
  getEmptyCharacter,
};

async function getCharacterByName(characterName) {
  const resourceType = ResourceTypes.character;
  let filterBy = getEmptyFilterBy(resourceType);
  filterBy.name = characterName;
  const payload = { resourceType, filterBy };
  const res = await rickAndMortyApi.get(payload);
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
