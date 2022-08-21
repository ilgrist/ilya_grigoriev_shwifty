export { BASE_URL, isProduction };

const isProduction = process.env.REACT_APP_NODE_ENV === 'production';

const BASE_URL = `https://rickandmortyapi.com/api`;
