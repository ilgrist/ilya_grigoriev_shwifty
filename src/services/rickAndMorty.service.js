import { ResourceTypes } from '../utils/constants';
export const rickAndMortyService = {
  getFilterBy,
  getEmptyCharacter,
};

function getFilterBy(resourceType) {
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
