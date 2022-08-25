export { BASE_URL, isProduction, ResourceTypes };

const isProduction = process.env.REACT_APP_NODE_ENV === 'production';

const BASE_URL = `https://rickandmortyapi.com/api`;

const ResourceTypes = {
  location: 'location',
  character: 'character',
  episode: 'episode',
};
