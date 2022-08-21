import { useEffect, useState } from 'react';
import { rickAndMortyApi } from '../services/rickAndMortyApi.service';

export const UnpopularCharFromLocation = ({ targetLocation = 'Earth (C-137)' }) => {
  const [charToDisplay, setCharToDisplay] = useState({
    charName: '',
    originName: '',
    originDimension: '',
    popularity: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    findUnpopularCharacterFromLocation(targetLocation);
  }, []);

  const findUnpopularCharacterFromLocation = async (targetLocation) => {
    setIsLoading(true);
    try {
      const location = await rickAndMortyApi.getLocationByName(targetLocation);
      const characterIds = getCharIdsFromLocation(location);
      const characters = await rickAndMortyApi.getCharactersByIds(characterIds);
      const unpopularCharacter = findCharWithMinEpisodes(characters);
      setCharToDisplay(unpopularCharacter);
    } catch (err) {
      setError(err);
      console.log('Error getting character: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCharIdsFromLocation = (location) => {
    const residents = location.results[0].residents || [];
    const residentsIds = residents.map((url) => url.split('/').pop());
    return residentsIds;
  };

  const findCharWithMinEpisodes = (chars) => {
    return chars.reduce((prev, curr) => (prev.episode.length < curr.episode.length ? prev : curr));
  };

  return (
    <div>
      <h1>UnpopularChar</h1>
      {charToDisplay.id && <pre>{JSON.stringify(charToDisplay, null, 2)}</pre>}
      {isLoading && <h2>Loading character</h2>}
    </div>
  );
};
